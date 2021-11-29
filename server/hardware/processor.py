import re
from functools import partial
from typing import Optional

from bs4 import BeautifulSoup

from hardware.domain import Locale, OS, ProcessingResult, Processor, Videocard
from hardware.models import Computer


class MSInfoProcessor:
    dictionary = {
        Locale.rus: {
            'User Name': 'Имя пользователя',
            'Platform Role': 'Имя пользователя',
            'Installed Physical Memory (RAM)': 'Установленная оперативная память (RAM)',
            'OS Name': 'Имя ОС',
            'System Type': 'Тип',
            'System Summary': 'Сведения о системе',
            'Processor': 'Процессор',
            'Display': 'Дисплей',
            'Name': 'Имя',
            'Item': 'Элемент',
        }
    }
    patterns = {
        'processor': {
            Locale.rus: re.compile(r'(.+?), ((\d+) МГц), (ядер: (\d+)), (логических процессоров: (\d+))'),
            Locale.eng: re.compile(r'(.+?), ((\d+) Mhz).+((\d) Core).+?((\d+) Logical)')
        },
        'ram': {
            Locale.rus: re.compile(r'(\d+).(\d+) ГБ'),
            Locale.eng: re.compile(r'(\d+).(\d+) GB'),
        },
        'videocard': re.compile(r'(.+) ((\d)GB)?')
    }

    def __init__(self, locale: Locale):
        self.locale = locale

    def localize(self, item):
        if self.locale == Locale.eng:
            return item

        return self.dictionary[self.locale][item]

    def _get_item_value(self, key: str, category: str, bs_obj: BeautifulSoup) -> Optional[str]:
        try:
            return bs_obj.find(
                name='Category',
                attrs={'name': self.localize(category)}
            ).find(
                name=self.localize('Item'),
                text=self.localize(key)
            ).find_next_sibling().text
        except AttributeError:
            return

    def _parse_processor_info(self, bs_obj: BeautifulSoup) -> Optional[Processor]:
        processor = self._get_item_value(
            key='Processor',
            category='System Summary',
            bs_obj=bs_obj
        )

        if processor is None:
            return

        match = self.patterns['processor'][self.locale].match(processor.strip())
        name, clock, cores, threads = match.group(1), match.group(3), match.group(5), match.group(7)

        processor = Processor(
            name=name,
            clock=int(clock),
            cores=int(cores),
            threads=int(threads)
        )

        return processor

    def _parse_videocard_info(self, bs_obj: BeautifulSoup) -> Optional[Videocard]:
        videocard = self._get_item_value(
            key='Name',
            category='Display',
            bs_obj=bs_obj
        )

        if videocard is None:
            return

        match = self.patterns['videocard'].match(videocard.strip())
        name, memory = match.group(1), match.group(3)

        videocard = Videocard(
            name=name,
            memory=memory and int(memory)
        )

        return videocard

    def _parse_os_info(self, bs_obj: BeautifulSoup) -> Optional[OS]:
        os_name = self._get_item_value(
            key='OS Name',
            category='System Summary',
            bs_obj=bs_obj,
        )
        os_system_type = self._get_item_value(
            key='System Type',
            category='System Summary',
            bs_obj=bs_obj,
        )

        if os_name is None:
            return

        os_architecture = None

        if os_system_type is None:
            pass
        elif 'x32' in os_system_type or 'x86' in os_system_type:
            os_architecture = Computer.Architecture.x32
        elif 'x64' in os_system_type:
            os_architecture = Computer.Architecture.x64

        os = OS(name=os_name.replace('Microsoft ', ''), architecture=os_architecture)

        return os

    def _parse_ram_info(self, bs_obj: BeautifulSoup) -> Optional[float]:
        ram = self._get_item_value(
            key='Installed Physical Memory (RAM)',
            category='System Summary',
            bs_obj=bs_obj,
        )

        if ram is None:
            return

        match = self.patterns['ram'][self.locale].match(ram)

        return float(f'{match.group(1)}.{match.group(2)}')

    def process(self, data: bytes) -> ProcessingResult:
        bs = BeautifulSoup(data, 'xml')

        get_system_summary = partial(self._get_item_value, category='System Summary', bs_obj=bs)

        os_info = self._parse_os_info(bs)
        cpu_info = self._parse_processor_info(bs)
        videocard_info = self._parse_videocard_info(bs)
        ram = self._parse_ram_info(bs)
        username = get_system_summary('User Name')
        hw_type = get_system_summary('Platform Role')
        name = get_system_summary('User Name')

        if name is None:
            return ProcessingResult(
                is_created=False,
                unparsed=[],
                name=None
            )

        computer, is_created = Computer.objects.update_or_create(
            defaults=dict(
                os_name=os_info and os_info.name,
                os_architecture=os_info and os_info.architecture,
                cpu_name=cpu_info and cpu_info.name,
                cpu_clock=cpu_info and cpu_info.clock,
                cpu_cores=cpu_info and cpu_info.cores,
                cpu_threads=cpu_info and cpu_info.threads,
                videocard_name=videocard_info and videocard_info.name,
                videocard_memory=videocard_info and videocard_info.memory,
                ram=ram,
                username=username and username.split('\\')[1],
            ),
            name=name and name.split('\\')[0],
        )

        return ProcessingResult(
            name=computer.name,
            is_created=is_created,
            unparsed=[
                item[0] for item in {
                    'OS': os_info,
                    'CPU': cpu_info,
                    'Videocard': videocard_info,
                    'RAM Size': ram,
                    'Username': username,
                }.items() if not item[1]
            ]

        )

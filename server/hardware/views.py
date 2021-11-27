import re
from functools import partial
from io import BytesIO
from typing import Optional

from bs4 import BeautifulSoup
from django.http import HttpRequest, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from dj_service.settings import BASE_DIR
from hardware.domain import OS, Processor, Videocard
from hardware.models import Computer


def _get_item_value(key: str, category: str, bs_obj: BeautifulSoup) -> str:
    return bs_obj.find(
        name='Category',
        attrs={'name': category}
    ).find(
        name='Item',
        text=key
    ).find_next_sibling().text


def _parse_processor_info(bs_obj: BeautifulSoup) -> Optional[Processor]:
    processor = _get_item_value(
        key='Processor',
        category='System Summary',
        bs_obj=bs_obj
    )
    pattern = re.compile(r'(.+?), (\d+ Mhz).+(\d Core).+?(\d+ Logical)')
    name, clock, cores, threads = pattern.match(processor).groups()

    processor = Processor(
        name=name,
        clock=int(clock.replace(' Mhz', '')),
        cores=int(cores.replace(' Core', '')),
        threads=int(threads.replace(' Logical', ''))
    )

    if any(item is None for item in (processor.name, processor.threads, processor.cores, processor.clock)):
        return None

    return processor


def _parse_videocard_info(bs_obj: BeautifulSoup) -> Optional[Videocard]:
    videocard = _get_item_value(
        key='Name',
        category='Display',
        bs_obj=bs_obj
    )
    pattern = re.compile(r'(.+) (\dGB)')
    name, memory = pattern.match(videocard).groups()

    videocard = Videocard(
        name=name,
        memory=int(memory.replace('GB', ''))
    )

    if any(item is None for item in (videocard.name, videocard.memory)):
        return None

    return videocard


def _parse_os_info(bs_obj: BeautifulSoup) -> Optional[OS]:
    os_name = _get_item_value(
        key='OS Name',
        category='System Summary',
        bs_obj=bs_obj
    )
    os_system_type = _get_item_value(
        key='System Type',
        category='System Summary',
        bs_obj=bs_obj
    )

    os_architecture = None

    if 'x32' in os_system_type or 'x86' in os_system_type:
        os_architecture = Computer.Architecture.x32
    if 'x64' in os_system_type:
        os_architecture = Computer.Architecture.x64

    os = OS(name=os_name.replace('Microsoft ', ''), architecture=os_architecture)

    if any(item is None for item in (os.name, os.architecture)):
        return None

    return os


def _get_console_response() -> str:
    with open(BASE_DIR / 'consoleResponse.txt') as file:
        return file.read()


def _generate_response() -> str:
    pass


# TODO: Parse drives
# TODO: Parse domain
# TODO: Parse ip
@require_POST
@csrf_exempt
def collect_msinfo(request: HttpRequest):
    raw = BytesIO(request.read())
    bs = BeautifulSoup(raw, 'xml')

    get_system_summary = partial(_get_item_value, category='System Summary', bs_obj=bs)

    os_info = _parse_os_info(bs_obj=bs)
    cpu_info = _parse_processor_info(bs_obj=bs)
    videocard_info = _parse_videocard_info(bs_obj=bs)

    pc, is_pc_created = Computer.objects.update_or_create(
        defaults=dict(
            hardware_type=get_system_summary('Platform Role'),
            os_name=os_info.name,
            os_architecture=os_info.architecture,
            cpu_name=cpu_info.name,
            cpu_clock=cpu_info.clock,
            cpu_cores=cpu_info.cores,
            cpu_threads=cpu_info.threads,
            videocard_name=videocard_info.name,
            videocard_memory=videocard_info.memory,
            ram=int(float(get_system_summary('Total Physical Memory').strip(' GB'))),
            username=get_system_summary('User Name').split('\\')[1],
        ),
        name=get_system_summary('User Name').split('\\')[0],
    )

    response_str = f'New computer added in database - {pc.name}' if is_pc_created else f'{pc.name} updated'

    return HttpResponse(response_str)

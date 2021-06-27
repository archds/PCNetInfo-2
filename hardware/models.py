import re

from django.db.models import (
    CharField,
    GenericIPAddressField,
    SmallIntegerField,
    IntegerField,
    DateTimeField,
    TextField,
    ForeignKey,
)
from django.db.models import Model
from django.db.models import CASCADE


class Monitor(Model):
    serial_number = CharField(max_length=50, unique=True)
    model = CharField(max_length=100)
    user = CharField(max_length=100)


class PC(Model):
    hardware_type = CharField(max_length=50)
    os_name = CharField(max_length=50)
    os_version = CharField(max_length=50)
    os_architecture = CharField(max_length=50)
    pc_name = CharField(max_length=50, unique=True)
    domain = CharField(max_length=50)
    ip = GenericIPAddressField(null=True)
    cpu_name = CharField(max_length=100)
    cpu_clock = SmallIntegerField(null=True)
    cpu_cores = SmallIntegerField(null=True)
    cpu_threads = SmallIntegerField(null=True)
    cpu_socket = CharField(max_length=10)
    motherboard_manufacturer = CharField(max_length=50)
    motherboard_product = CharField(max_length=100)
    motherboard_serial = CharField(max_length=100)
    ram = IntegerField(null=True)
    ram0_Configuredclockspeed = IntegerField(null=True)
    ram0_Capacity = IntegerField(null=True)
    ram1_Configuredclockspeed = IntegerField(null=True)
    ram1_Capacity = IntegerField(null=True)
    ram2_Configuredclockspeed = IntegerField(null=True)
    ram2_Capacity = IntegerField(null=True)
    ram3_Configuredclockspeed = IntegerField(null=True)
    ram3_Capacity = IntegerField(null=True)
    videocard = CharField(max_length=100)
    resX = IntegerField(null=True)
    resY = IntegerField(null=True)
    username = CharField(max_length=100)
    timezone = CharField(max_length=100)
    user = CharField(max_length=200)
    serial_number = IntegerField(null=True)
    location = CharField(max_length=200)
    updated = DateTimeField(auto_now=True)
    comment = TextField()
    label = CharField(max_length=100)
    form_factor = CharField(max_length=20)
    monitor = ForeignKey(Monitor, on_delete=CASCADE, null=True)

    def to_schema(self) -> dict:
        def badDataMark(hw_elem: dict):
            ignored = [
                'label',
                'user',
                'serial_number',
                'location',
                'comment',
                'form_factor',
            ]
            for key in hw_elem.keys():
                if key in ignored:
                    continue
                if isinstance(hw_elem[key], str):
                    hw_elem[key] = hw_elem[key].replace('?', '').replace('()', '').strip()
                    if not hw_elem[key]:
                        hw_elem[key] = 'No data'
                    hw_elem[key] = " ".join(hw_elem[key].split())
                elif isinstance(hw_elem[key], dict):
                    hw_elem[key] = badDataMark(hw_elem[key])
            return hw_elem

        def rename_cpu(name: str):
            special_ignored = ['(R)', '(TM)', 'CPU ', '@', '(tm)']
            for char in special_ignored:
                name = name.replace(char, '')
            match_clock = re.search(r'\d\.\d{1,2}\wHz', name)
            match_apu = name.find('APU')
            if match_apu:
                name = name[:match_apu]
            if match_clock:
                idx = match_clock.span()[0]
                name = name[:idx].strip()
            return name

        bytes_in_gb = 1073741824
        kb_in_gb = 1048576

        response = {
            'id': self.pk,
            'name': self.pc_name,
            'domain': self.domain,
            'ip': self.ip,
            'hardware_type': self.hardware_type,
            'username': self.username,
            'timezone': self.timezone,
            'user': self.user,
            'serial_number': self.serial_number,
            'location': self.location,
            'updated': self.updated and self.updated.strftime('%d.%m.%Y'),
            'comment': self.comment,
            'label': self.label,
            'form_factor': self.form_factor,
            'os': {
                'name': self.os_name,
                'version': self.os_version,
                'architecture': self.os_architecture
            },
            'cpu': {
                'name': self.cpu_name,
                'clock': self.cpu_clock,
                'cores': self.cpu_cores,
                'threads': self.cpu_threads,
                'socket': self.cpu_socket,
            },
            'motherboard': {
                'manufacturer': self.motherboard_manufacturer,
                'product': self.motherboard_product,
                'serial': self.motherboard_serial,
            },
            'ram': {
                'size': self.ram and int(self.ram / kb_in_gb),
                'banks': [
                    {
                        'speed': self.ram0_Configuredclockspeed,
                        'capacity': self.ram0_Capacity and self.ram0_Capacity / bytes_in_gb
                    },
                    {
                        'speed': self.ram1_Configuredclockspeed,
                        'capacity': self.ram1_Capacity and self.ram1_Capacity / bytes_in_gb
                    },
                    {
                        'speed': self.ram2_Configuredclockspeed,
                        'capacity': self.ram2_Capacity and self.ram2_Capacity / bytes_in_gb
                    },
                    {
                        'speed': self.ram3_Configuredclockspeed,
                        'capacity': self.ram3_Capacity and self.ram3_Capacity / bytes_in_gb
                    },
                ]
            },
            'videocard': {
                'name': self.videocard,
                'resX': self.resX,
                'resY': self.resY,
            },
        }

        response = badDataMark(response)
        response['timezone'] = response['timezone'].rstrip(' , -')

        if 'bit' not in response['os']['architecture']:
            response['os']['architecture'] = response['os']['architecture'] + 'bit'

        response['cpu']['clock'] = round(response['cpu']['clock'], 1)
        response['cpu']['name'] = rename_cpu(response['cpu']['name'])

        return response

import re
from datetime import datetime
from pprint import pprint

from django.db import IntegrityError
from django.shortcuts import render
from asgiref.sync import sync_to_async
from hardware.models import PC


@sync_to_async
def add_pc(parsed_data: dict) -> str:
    pc = PC(**parsed_data)
    schema_response = {
        'Name': pc.pc_name,
        'Domain': pc.domain,
        'IP': pc.ip,
        'OS': f'{pc.os_name}, {pc.os_version}, {pc.os_architecture}',
        'CPU': f'{pc.cpu_name}, {pc.cpu_clock} MHz; C/T: {pc.cpu_cores}/{pc.cpu_threads}; socket: {pc.cpu_socket}',
        'Memory': f'Capacity: {pc.ram / 1048576} GB',
        'Motherboard': f'{pc.motherboard_manufacturer} {pc.motherboard_product}',
        'Videocard': pc.videocard,
        'Monitor': pc.monitor,
        # 'Not transited': [i for i in data if data[i] is None],
    }

    with open('consoleResponse.txt', encoding='UTF-8') as art:
        response = f'\n{art.read()}\n'
        now = datetime.now().strftime('%H:%M:%S, %d.%m.%Y')

        for key, value in schema_response.items():
            if isinstance(value, list) and key == 'Monitors':
                response += 'Monitors: '
                for monitor in value:
                    response += f'{monitor.model}, '
                response = response.rstrip(', ')
                response += '\n'
            else:
                response += f'{key}: {value}\n'

    try:
        pc.save()
        response += f'\n{now} - New database object created'
        return response

    except IntegrityError:
        to_update = PC.objects.get(pc_name=parsed_data['pc_name'])
        PC(id=to_update.pk, **parsed_data).save()
        response += f'\n{now} - Existed database object updated!\n'
        return response


@sync_to_async
def pc_main_context() -> list[dict]:
    return [response_formatter(pc) for pc in PC.objects.order_by('label').all()]


@sync_to_async
def pc_single_context(pc_name: str) -> dict:
    return response_formatter(PC.objects.get(pc_name=pc_name))


def response_formatter(pc: PC) -> dict:
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

    GB = 1073741824

    response = {
        'id': pc.pk,
        'name': pc.pc_name,
        'domain': pc.domain,
        'ip': pc.ip,
        'hardware_type': pc.hardware_type,
        'username': pc.username,
        'timezone': pc.timezone,
        'user': pc.user,
        'serial_number': pc.serial_number,
        'location': pc.location,
        'updated': pc.updated and pc.updated.strftime('%d.%m.%Y'),
        'comment': pc.comment,
        'label': pc.label,
        'form_factor': pc.form_factor,
        'os': {
            'name': pc.os_name,
            'version': pc.os_version,
            'architecture': pc.os_architecture
        },
        'cpu': {
            'name': pc.cpu_name,
            'clock': pc.cpu_clock,
            'cores': pc.cpu_cores,
            'threads': pc.cpu_threads,
            'socket': pc.cpu_socket,
        },
        'motherboard': {
            'manufacturer': pc.motherboard_manufacturer,
            'product': pc.motherboard_product,
            'serial': pc.motherboard_serial,
        },
        'ram': {
            'size': pc.ram,
            'banks': [
                {'speed': pc.ram0_Configuredclockspeed, 'capacity': pc.ram0_Capacity and pc.ram0_Capacity / GB},
                {'speed': pc.ram1_Configuredclockspeed, 'capacity': pc.ram1_Capacity and pc.ram1_Capacity / GB},
                {'speed': pc.ram2_Configuredclockspeed, 'capacity': pc.ram2_Capacity and pc.ram2_Capacity / GB},
                {'speed': pc.ram3_Configuredclockspeed, 'capacity': pc.ram3_Capacity and pc.ram3_Capacity / GB},
            ]
        },
        'videocard': {
            'name': pc.videocard,
            'resX': pc.resX,
            'resY': pc.resY,
        },
    }
    pprint(response['updated'])

    response = badDataMark(response)
    response['timezone'] = response['timezone'].rstrip(' , -')

    if 'bit' not in response['os']['architecture']:
        response['os']['architecture'] = response['os']['architecture'] + 'bit'

    response['cpu']['clock'] = round(response['cpu']['clock'], 1)
    response['cpu']['name'] = rename_cpu(response['cpu']['name'])

    return response

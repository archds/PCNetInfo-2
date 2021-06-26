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
    return [pc.to_schema() for pc in PC.objects.order_by('label').all()]


@sync_to_async
def pc_single_context(pc_name: str) -> dict:
    return PC.objects.get(pc_name=pc_name).to_schema()



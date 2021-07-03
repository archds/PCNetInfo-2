import asyncio
import json
from datetime import datetime
from pprint import pprint

from django.http.response import HttpResponse, FileResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from hardware.context import get_nav
from hardware.models import PC
from hardware.parser import parse_powershell

filters = [
    {
        'name': 'Serial number',
        'id': 'serialNumber',
        'options': [
            {
                'name': 'Any',
                'value': 'ANY',
            },
            {
                'name': 'Specified',
                'value': 'SPECIFIED',
            },
            {
                'name': 'Not specified',
                'value': 'NOT_SPECIFIED',
            },
        ]
    }
]


def generate_add_pc_response(pc: PC, create: bool) -> str:
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

    if create:
        response += f'\n{now} - New database object created'
    else:
        response += f'\n{now} - Existed database object updated!\n'

    return response


@require_http_methods(['POST'])
@csrf_exempt
def add_pc(request) -> HttpResponse:
    new_pc = parse_powershell(
        data=json.loads(request.body),
        addr=request.META.get('REMOTE_ADDR')
    )
    new_pc, created = PC.objects.update_or_create(**new_pc)
    return HttpResponse(generate_add_pc_response(new_pc, created))


def pc_list(request) -> HttpResponse:
    context = {
        'items': [pc.context for pc in PC.objects.order_by('label').all()],
        'filters': filters,
        'nav': get_nav()
    }
    return render(
        request,
        template_name='pc_list.html',
        context=context
    )


def pc_view(request, pc_name: str) -> HttpResponse:
    context = {
        'pc': PC.objects.get(pc_name=pc_name).context,
        'nav': get_nav()
    }
    return render(
        request,
        template_name='pc_view.html',
        context=context
    )


def monitor_list(request):
    context = {
        'monitors': None,
        'nav': get_nav(),
    }
    return render(
        request,
        template_name='wip_cover.html',
        context=context
    )


def monitor_view(request):
    pass


def get_file(request, file_name: str) -> FileResponse:
    return FileResponse(f'filehost/{file_name}')


def not_found(request, exception) -> HttpResponse:
    context = {
        'nav': get_nav()
    }
    return render(
        request,
        template_name='wip_cover.html',
        context=context,
    )

import re

import gql_api.type_defs as gqt
from hardware.models import PC


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


@gqt.cpu.field('name')
def resolve_cpu_name(pc_obj: PC, info):
    return rename_cpu(pc_obj.cpu_name).strip()


@gqt.cpu.field('clock')
def resolve_cpu_clock(pc_obj: PC, info):
    return pc_obj.cpu_clock


@gqt.cpu.field('cores')
def resolve_cpu_cores(pc_obj: PC, info):
    return pc_obj.cpu_cores


@gqt.cpu.field('threads')
def resolve_cpu_threads(pc_obj: PC, info):
    return pc_obj.cpu_threads


@gqt.cpu.field('socket')
def resolve_cpu_socket(pc_obj: PC, info):
    return pc_obj.cpu_socket
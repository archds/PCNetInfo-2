import gql_api.type_defs as gqt
from hardware.models import PC


@gqt.cpu.field('name')
def resolve_cpu_name(pc_obj: PC, info):
    return pc_obj.cpu.name


@gqt.cpu.field('clock')
def resolve_cpu_clock(pc_obj: PC, info):
    return pc_obj.cpu.clock


@gqt.cpu.field('cores')
def resolve_cpu_cores(pc_obj: PC, info):
    return pc_obj.cpu.cores


@gqt.cpu.field('threads')
def resolve_cpu_threads(pc_obj: PC, info):
    return pc_obj.cpu.threads


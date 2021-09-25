import gql_api.type_defs as gqt
from hardware.models import PC, CPU


@gqt.cpu.field('name')
def resolve_cpu_name(cpu_obj: CPU, info):
    return cpu_obj.name


@gqt.cpu.field('clock')
def resolve_cpu_clock(cpu_obj: CPU, info):
    return cpu_obj.clock


@gqt.cpu.field('cores')
def resolve_cpu_cores(cpu_obj: CPU, info):
    return cpu_obj.cores


@gqt.cpu.field('threads')
def resolve_cpu_threads(cpu_obj: CPU, info):
    return cpu_obj.threads


import gql_api.type_defs as gqt
from hardware.models import PC


@gqt.pc.field('name')
def resolve_pc_name(pc_obj: PC, info):
    return pc_obj.pc_name


@gqt.pc.field('domain')
def resolve_pc_domain(pc_obj: PC, info):
    return pc_obj.domain


@gqt.pc.field('ip')
def resolve_pc_ip(pc_obj: PC, info):
    return pc_obj.ip


@gqt.pc.field('hardware_type')
def resolve_pc_hardware_type(pc_obj: PC, info):
    return pc_obj.hardware_type


@gqt.pc.field('username')
def resolve_pc_username(pc_obj: PC, info):
    return pc_obj.username


@gqt.pc.field('timezone')
def resolve_pc_timezone(pc_obj: PC, info):
    return pc_obj.timezone


@gqt.pc.field('user')
def resolve_pc_user(pc_obj: PC, info):
    return pc_obj.user


@gqt.pc.field('location')
def resolve_pc_location(pc_obj: PC, info):
    return pc_obj.location


@gqt.pc.field('updated')
def resolve_pc_updated(pc_obj: PC, info):
    return pc_obj.updated and pc_obj.updated.strftime('%d.%m.%Y')


@gqt.pc.field('comment')
def resolve_pc_comment(pc_obj: PC, info):
    return pc_obj.comment


@gqt.pc.field('label')
def resolve_pc_label(pc_obj: PC, info):
    return pc_obj.label


@gqt.pc.field('os')
def resolve_pc_os(pc_obj: PC, info):
    return pc_obj


@gqt.pc.field('cpu')
def resolve_pc_cpu(pc_obj: PC, info):
    return pc_obj


@gqt.pc.field('motherboard')
def resolve_pc_motherboard(pc_obj: PC, info):
    return pc_obj


@gqt.pc.field('ram')
def resolve_pc_ram(pc_obj: PC, info):
    return pc_obj


@gqt.pc.field('videocard')
def resolve_pc_videocard(pc_obj: PC, info):
    return pc_obj

import gql_api.type_defs as gqt
from hardware.models import PC


@gqt.pc.field('name')
def resolve_pc_name(pc_obj: PC, info):
    return pc_obj.name


@gqt.pc.field('domain')
def resolve_pc_domain(pc_obj: PC, info):
    return pc_obj.domain


@gqt.pc.field('ip')
def resolve_pc_ip(pc_obj: PC, info):
    return pc_obj.ip


@gqt.pc.field('type')
def resolve_pc_hardware_type(pc_obj: PC, info):
    return pc_obj.hardware_type.upper()


@gqt.pc.field('username')
def resolve_pc_username(pc_obj: PC, info):
    return pc_obj.username and pc_obj.username.replace('?', '').replace('\\', '').replace(pc_obj.name, '')


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
    return pc_obj.os


@gqt.pc.field('cpu')
def resolve_pc_cpu(pc_obj: PC, info):
    return pc_obj.cpu


@gqt.pc.field('videocard')
def resolve_pc_videocard(pc_obj: PC, info):
    return pc_obj.videocard


@gqt.pc.field('form_factor')
def resolve_pc_form_factor(pc_obj: PC, info):
    return pc_obj.form_factor


@gqt.pc.field('serial')
def resolve_pc_serial(pc_obj: PC, info):
    return pc_obj.serial_number


@gqt.pc.field('ram')
def resolve_pc_ram(pc_obj: PC, info):
    return pc_obj.ram

import gql_api.type_defs as gqt
from hardware.models import PC


@gqt.videocard.field('name')
def resolve_videocard_name(pc_obj: PC, info):
    return pc_obj.videocard.name


@gqt.videocard.field('memory')
def resolve_videocard_name(pc_obj: PC, info):
    return pc_obj.videocard.memory

import gql_api.type_defs as gqt
from hardware.models import PC


@gqt.videocard.field('name')
def resolve_videocard_name(pc_obj: PC, info):
    return pc_obj.videocard


@gqt.videocard.field('resX')
def resolve_videocard_resx(pc_obj: PC, info):
    return pc_obj.resX


@gqt.videocard.field('resY')
def resolve_videocard_resy(pc_obj: PC, info):
    return pc_obj.resY

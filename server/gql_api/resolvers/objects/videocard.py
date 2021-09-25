import gql_api.type_defs as gqt
from hardware.models import PC, Videocard


@gqt.videocard.field('name')
def resolve_videocard_name(vc_obj: Videocard, info):
    return vc_obj.name


@gqt.videocard.field('memory')
def resolve_videocard_name(vc_obj: Videocard, info):
    return vc_obj.memory

import gql_api.api as gqt
from hardware.models import PC


@gqt.os.field('name')
def os_name_resolver(pc_obj: PC, info):
    return pc_obj.os_name


@gqt.os.field('version')
def os_version_resolver(pc_obj: PC, info):
    return pc_obj.os_version


@gqt.os.field('architecture')
def os_architecture_resolver(pc_obj: PC, info):
    return pc_obj.os_architecture

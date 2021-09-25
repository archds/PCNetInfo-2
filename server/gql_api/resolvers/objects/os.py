import gql_api.type_defs as gqt
from hardware.models import PC, OS


@gqt.os.field('name')
def os_name_resolver(os_obj: OS, info):
    return os_obj.name


@gqt.os.field('architecture')
def os_architecture_resolver(os_obj: OS, info):
    return os_obj.architecture

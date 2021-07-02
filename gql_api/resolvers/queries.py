import gql_api.type_defs as gqt
from hardware.models import PC


@gqt.query.field('hello')
def resolve_hello(*_):
    return 'Hello PCNetInfo!'


@gqt.query.field('AllPC')
def resolve_allpc(*_):
    return [pc for pc in PC.objects.order_by('label').all()]


@gqt.query.field('PC')
def resolve_pc(obj, info, name):
    return PC.objects.get(pc_name=name)

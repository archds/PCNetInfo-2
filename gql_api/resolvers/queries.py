import gql_api.api as gqt
from hardware.models import PC




@gqt.query.field('AllPC')
def resolve_allpc(*_):
    return [pc for pc in PC.objects.order_by('label').all()]


@gqt.query.field('PC')
def resolve_pc(obj, info, pc_name):
    print(pc_name)
    return PC.objects.get(pc_name=pc_name)
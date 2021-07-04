from pprint import pprint

from ariadne import convert_kwargs_to_snake_case
from django.db.models import F, When, Case

import gql_api.type_defs as gqt
from hardware.models import PC


@gqt.mutation.field('updateField')
@convert_kwargs_to_snake_case
def update_field_resolver(obj, info, field: str, value: str, pc_name: str) -> bool:
    field = 'hardware_type' if field == 'type' else field
    if 'Capacity' in field:
        value = int(value) * 1024 * 1024 * 1024
    if field == 'ram':
        value = int(value) * 1024 * 1024
    PC.objects.filter(pc_name=pc_name).update(**{field: value})
    return True


@gqt.mutation.field('deletePC')
@convert_kwargs_to_snake_case
def delete_pc_resolver(obj, info, pc_name: str) -> bool:
    PC.objects.get(pc_name=pc_name).delete()
    return True

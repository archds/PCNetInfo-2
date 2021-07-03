from ariadne import convert_kwargs_to_snake_case
from django.db.models import F, When, Case

import gql_api.type_defs as gqt
from hardware.models import PC


@gqt.mutation.field('updateField')
@convert_kwargs_to_snake_case
def update_field_resolver(obj, info, field: str, value: str, pc_name: str) -> bool:
    PC.objects.filter(pc_name=pc_name).update(**{field: value})
    return True

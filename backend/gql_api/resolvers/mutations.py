from typing import Dict, List

from ariadne import convert_kwargs_to_snake_case

import gql_api.type_defs as gqt
from gql_api.actions.domain import convert_gql_pc
from hardware.models import PC


@gqt.mutation.field('deletePC')
def delete_pc(obj, info, names: List[str]) -> str:
    PC.objects.filter(pc_name__in=names).delete()
    return 'UNIT'


@gqt.mutation.field('createPC')
def create_pc(obj, info, input: Dict) -> PC:
    kwargs = convert_gql_pc(gql_input=input)
    return PC.objects.create(**kwargs)


@gqt.mutation.field('updatePC')
def update_pc(obj, info, name: str, input: Dict) -> PC:
    kwargs = convert_gql_pc(gql_input=input)

    PC.objects.filter(pc_name=name).update(
        **{
            field: value
            for field, value in kwargs.items()
            if value is not None
        }
    )

    return PC.objects.get(pc_name=name)

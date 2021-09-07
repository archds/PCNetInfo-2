from typing import Dict

from ariadne import convert_kwargs_to_snake_case

import gql_api.type_defs as gqt
from hardware.models import PC


@gqt.mutation.field('deletePC')
@convert_kwargs_to_snake_case
def delete_pc(obj, info, pc_name: str) -> bool:
    PC.objects.get(pc_name=pc_name).delete()
    return True


@gqt.mutation.field('createPC')
@convert_kwargs_to_snake_case
def create_pc(obj, info, gql_input: Dict) -> PC:
    return PC.objects.create(
        pc_name=gql_input['name'],
        os_name=gql_input['os']['name'],
        cpu_name=gql_input['cpu']['name'],
        ram=gql_input['ram']['size'],
    )


@gqt.mutation.field('updatePC')
@convert_kwargs_to_snake_case
def update_pc(obj, info, name: str, gql_input: Dict) -> PC:
    options = {
        'pc_name': gql_input.get('name'),
        'os_name': gql_input.get('os', {}).get('name'),
        'cpu_name': gql_input.get('cpu', {}).get('name'),
        'ram': gql_input.get('ram', {}).get('size')
    }

    PC.objects.filter(pc_name=name).update(
        **{
            field: value
            for field, value in options.items()
            if value is not None
        }
    )

    return PC.objects.get(pc_name=gql_input['name'])

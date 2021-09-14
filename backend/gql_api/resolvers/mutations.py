from typing import Dict, List

from ariadne import convert_kwargs_to_snake_case

import gql_api.type_defs as gqt
from hardware.models import PC


@gqt.mutation.field('deletePC')
def delete_pc(obj, info, names: List[str]) -> str:
    PC.objects.filter(pc_name__in=names).delete()
    return 'UNIT'


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
def update_pc(obj, info, name: str, input: Dict) -> PC:
    options = {
        'pc_name': input.get('name'),
        'hardware_type': input.get('type'),
        'os_name': input.get('os', {}).get('name'),
        'cpu_name': input.get('cpu', {}).get('name'),
        'ram': input.get('ram', {}).get('size')
    }

    PC.objects.filter(pc_name=name).update(
        **{
            field: value
            for field, value in options.items()
            if value is not None
        }
    )

    print(PC.objects.get(pc_name=name).hardware_type)

    return PC.objects.get(pc_name=name)

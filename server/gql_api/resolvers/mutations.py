from typing import Dict, List

import gql_api.type_defs as gqt
from gql_api.actions.domain import convert_gql_pc
from hardware.models import PC, OS, CPU, Videocard
from gql_api.errors import ReadableError, InputError


@gqt.mutation.field('deletePC')
def delete_pc(obj, info, names: List[str]) -> str:
    PC.objects.filter(name__in=names).delete()
    return 'UNIT'


@gqt.mutation.field('createPC')
def create_pc(obj, info, input: Dict) -> PC:
    input = convert_gql_pc(gql_input=input)
    if PC.objects.filter(name=input['common']['name']).exists():
        raise InputError(
            message='Computer with this name already exists',
            field='name'
        )

    return PC.objects.create(
        **input['common'],
        os=input['os'] and OS(
            name=input['os']['name'],
            version=input['os']['version'],
            architecture='x64' if '64' in input['os']['architecture'] else 'x32',
        ),
        cpu=input['cpu'] and CPU(**input['cpu']),
        videocard=input['videocard'] and Videocard(**input['videocard'])
    )


@gqt.mutation.field('updatePC')
def update_pc(obj, info, name: str, input: Dict) -> PC:
    kwargs = convert_gql_pc(gql_input=input)

    PC.objects.filter(name=name).update(
        **{
            field: value
            for field, value in kwargs.items()
            if value is not None
        }
    )

    return PC.objects.get(pc_name=name)

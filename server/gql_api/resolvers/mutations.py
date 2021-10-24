from typing import Dict, List

import gql_api.type_defs as gqt
from gql_api.actions.domain import convert_gql_pc
from gql_api.errors import InputError
from hardware.models import PC, OS, CPU, Videocard, UserRole, User


@gqt.mutation.field('deleteComputer')
def delete_pc(obj, info, ids: List[str]) -> str:
    PC.objects.filter(pk__in=ids).delete()
    return 'UNIT'


@gqt.mutation.field('createComputer')
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


@gqt.mutation.field('updateComputer')
def update_pc(obj, info, id: str, input: Dict) -> PC:
    input = convert_gql_pc(gql_input=input)

    PC.objects.filter(pk=id).update(
        **{
            field: value
            for field, value in input['common'].items()
            if value is not None
        }
    )

    return PC.objects.get(pk=id)


@gqt.mutation.field('createUser')
def create_user(obj, info, input: Dict):
    role = input.get('role')
    if role:
        role, created = UserRole.objects.get_or_create(title=role)

    return User.objects.create(
        first_name=input['firstName'],
        last_name=input['lastName'],
        role=role,
    )

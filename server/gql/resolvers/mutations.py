from typing import Dict, List

import gql.type_defs as gqt
from gql.actions.domain import convert_gql_pc
from gql.errors import InputError
from gql.resolvers.presentation.computer import gql_computer_convert
from hardware.models import Computer, User, UserRole


@gqt.mutation.field('deleteComputer')
def delete_pc(obj, info, ids: List[str]) -> str:
    Computer.objects.filter(pk__in=ids).delete()
    return 'UNIT'


@gqt.mutation.field('createComputer')
def create_pc(obj, info, input: Dict):
    converted = convert_gql_pc(gql_input=input)
    if Computer.objects.filter(name=converted['name']).exists():
        raise InputError(
            message='Computer with this name already exists',
            field='name'
        )

    comp = Computer.objects.create(**converted)

    return gql_computer_convert(comp)


@gqt.mutation.field('updateComputer')
def update_pc(obj, info, id: str, input: Dict):
    input = convert_gql_pc(gql_input=input)

    Computer.objects.filter(pk=id).update(
        **{
            field: value
            for field, value in input.items()
            if value is not None
        }
    )

    return gql_computer_convert(Computer.objects.get(pk=id))


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

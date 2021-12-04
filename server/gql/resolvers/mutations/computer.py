from gql import type_defs as gqt
from gql.actions.domain import convert_gql_pc
from gql.errors import InputError
from hardware.models import Computer


@gqt.mutation.field('deleteComputer')
def delete_computer(obj, info, ids: list[str]) -> str:
    Computer.objects.filter(pk__in=ids).delete()
    return gqt.Unit


@gqt.mutation.field('createComputer')
def create_computer(obj, info, input: dict):
    converted = convert_gql_pc(gql_input=input)
    if Computer.objects.filter(name=converted['name']).exists():
        raise InputError(
            message='Computer with this name already exists',
            field='name'
        )

    Computer.objects.create(**converted)

    return gqt.Unit


@gqt.mutation.field('updateComputer')
def update_computer(obj, info, id: str, input: dict):
    input = convert_gql_pc(gql_input=input)

    Computer.objects.filter(pk=id).update(**{field: value for field, value in input.items() if value is not None})

    return gqt.Unit

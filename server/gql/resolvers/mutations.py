import gql.type_defs as gqt
from gql.actions.domain import convert_gql_pc
from gql.errors import InputError, ReadableError
from hardware.models import Building, Computer, Location, User, UserRole


@gqt.mutation.field('deleteComputer')
def delete_pc(obj, info, ids: list[str]) -> str:
    Computer.objects.filter(pk__in=ids).delete()
    return gqt.Unit


@gqt.mutation.field('createComputer')
def create_pc(obj, info, input: dict):
    converted = convert_gql_pc(gql_input=input)
    if Computer.objects.filter(name=converted['name']).exists():
        raise InputError(
            message='Computer with this name already exists',
            field='name'
        )

    comp = Computer.objects.create(**converted)

    return gqt.Unit


@gqt.mutation.field('updateComputer')
def update_pc(obj, info, id: str, input: dict):
    input = convert_gql_pc(gql_input=input)

    Computer.objects.filter(pk=id).update(**{field: value for field, value in input.items() if value is not None})

    return gqt.Unit


@gqt.mutation.field('createUser')
def create_user(obj, info, input: dict):
    role = input.get('role')
    if role:
        role, created = UserRole.objects.get_or_create(title=role)

    User.objects.create(
        first_name=input['firstName'],
        last_name=input['lastName'],
        role=role,
    )

    return gqt.Unit


@gqt.mutation.field('createBuilding')
def create_building(obj, info, input: dict):
    street = input['street']
    house = input['house']

    if Building.objects.filter(street=street, house=house).exists():
        raise ReadableError('This building already exists!')

    Building.objects.create(street=street, house=house)

    return gqt.Unit


@gqt.mutation.field('updateBuilding')
def update_building(obj, info, id: str, input: dict):
    if buiding := Building.objects.filter(pk=id):
        buiding.update(
            street=input['street'],
            house=input['house'],
        )
    else:
        raise AttributeError(f'No building with id - {id}')

    return gqt.Unit


@gqt.mutation.field('deleteBuilding')
def delete_building(obj, info, id: str):
    if buiding := Building.objects.filter(pk=id):
        buiding.delete()
    else:
        raise AttributeError(f'No building with id - {id}')

    return gqt.Unit


@gqt.mutation.field('createLocation')
def create_location(obj, info, input: dict):
    if Location.objects.filter(building_id=input['buildingId'], cabinet=input['cabinet']).exists():
        raise ReadableError('Location in this building already exists!')

    Location.objects.create(
        building_id=input['buildingId'],
        cabinet=input['cabinet'],
        floor=input.get('floor'),
        description=input.get('description'),
    )

    return gqt.Unit


@gqt.mutation.field('updateLocation')
def update_location(obj, info, id: str, input: dict):
    if location := Location.objects.filter(pk=id):
        kwargs = {
            'building_id': input['buildingId'],
            'cabinet': input['cabinet'],
            'floor': input.get('floor'),
            'description': input.get('description')
        }
        location.update(**{key: item for key, item in kwargs.items() if item is not None})
    else:
        raise AttributeError(f'No location with id - {id}')

    return gqt.Unit


@gqt.mutation.field('deleteLocation')
def delete_location(obj, info, id: str):
    if location := Location.objects.filter(pk=id):
        location.delete()
    else:
        raise AttributeError(f'No location with id - {id}')

    return gqt.Unit

from gql import type_defs as gqt
from gql.errors import ReadableError
from hardware.models import Building, Location


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

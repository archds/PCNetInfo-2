from functools import partial
from pathlib import Path

from django.conf import settings

from tests.common.requests import send_request

send_mutation = partial(
    send_request,
    request_body_dir=Path(settings.BASE_DIR) / 'tests' / 'graphql' / 'mutations',
)


def send_create_computer_mutation(input_data: dict):
    return send_mutation(
        name='createComputer',
        variables={
            'input': input_data
        }
    )


def send_delete_computer_mutation(computer_id: str):
    return send_mutation(
        name='deleteComputer',
        variables={
            'id': computer_id
        }
    )


def send_update_computer_mutation(computer_id: str, data: dict):
    return send_mutation(
        name='updateComputer',
        variables={
            'id': computer_id,
            'input': data
        }
    )


def send_create_building_mutation(street: str, house: str):
    return send_mutation(
        name='createBuilding',
        variables={
            'street': street,
            'house': house
        }
    )


def send_update_building_mutation(id: str, street: str, house: str):
    return send_mutation(
        name='updateBuilding',
        variables={
            'id': id,
            'street': street,
            'house': house
        }
    )


def send_delete_building_mutation(id: str):
    return send_mutation(
        name='deleteBuilding',
        variables={'id': id}
    )


def send_create_location_mutation(building_id: str, cabinet: str, floor: int = None, description: str = None):
    return send_mutation(
        name='createLocation',
        variables={
            'buildingId': building_id,
            'cabinet': cabinet,
            'floor': floor,
            'description': description,
        }
    )


def send_update_location_mutation(
        id: str,
        building_id: str,
        cabinet: str,
        floor: int = None,
        description: str = None
):
    return send_mutation(
        name='updateLocation',
        variables={
            'id': id,
            'buildingId': building_id,
            'cabinet': cabinet,
            'floor': floor,
            'description': description,
        }
    )


def send_delete_location_mutation(id: str):
    return send_mutation(
        name='deleteLocation',
        variables={'id': id}
    )


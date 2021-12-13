from functools import partial
from pathlib import Path

from django.conf import settings

from tests.common.requests import send_request

send_mutation = partial(
    send_request,
    request_body_dir=Path(settings.BASE_DIR) / 'tests' / 'graphql' / 'mutations',
)


def send_create_computer_mutation(input_data: dict, token: str):
    return send_mutation(
        name='createComputer',
        variables={
            'input': input_data
        },
        token=token
    )


def send_delete_computer_mutation(computer_id: str, token: str):
    return send_mutation(
        name='deleteComputer',
        variables={
            'id': computer_id
        },
        token=token
    )


def send_update_computer_mutation(computer_id: str, data: dict, token: str):
    return send_mutation(
        name='updateComputer',
        variables={
            'id': computer_id,
            'input': data
        },
        token=token
    )


def send_create_building_mutation(street: str, house: str, token: str):
    return send_mutation(
        name='createBuilding',
        variables={
            'street': street,
            'house': house
        },
        token=token
    )


def send_update_building_mutation(id: str, street: str, house: str, token: str):
    return send_mutation(
        name='updateBuilding',
        variables={
            'id': id,
            'street': street,
            'house': house
        },
        token=token
    )


def send_delete_building_mutation(id: str, token: str):
    return send_mutation(
        name='deleteBuilding',
        variables={'id': id},
        token=token
    )


def send_create_location_mutation(
        building_id: str,
        cabinet: str,
        token: str,
        floor: int = None,
        description: str = None
):
    return send_mutation(
        name='createLocation',
        variables={
            'buildingId': building_id,
            'cabinet': cabinet,
            'floor': floor,
            'description': description,
        },
        token=token
    )


def send_update_location_mutation(
        id: str,
        building_id: str,
        cabinet: str,
        token: str,
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
        },
        token=token
    )


def send_delete_location_mutation(id: str, token: str):
    return send_mutation(
        name='deleteLocation',
        variables={'id': id},
        token=token
    )


def send_create_user_role_mutation(token: str, title: str, priority: int = None):
    return send_mutation(
        name='createComputerUserRole',
        token=token,
        variables={
            'title': title,
            'priority': priority
        }
    )


def send_delete_user_role_mutation(token: str, role_id: str):
    return send_mutation(
        name='deleteComputerUserRole',
        token=token,
        variables={'id': role_id}
    )


def send_create_user_mutation(token: str, first_name: str, last_name: str = None, roles: list[str] = None):
    return send_mutation(
        name='createUser',
        token=token,
        variables={
            'firstName': first_name,
            'lastName': last_name,
            'roleTitles': roles or [],
        }
    )


def send_update_user_mutation(
        token: str,
        user_id: str,
        first_name: str,
        last_name: str = None,
        roles: list[str] = None
):
    return send_mutation(
        name='updateUser',
        token=token,
        variables={
            'firstName': first_name,
            'lastName': last_name,
            'roleTitles': roles or [],
            'id': user_id
        }
    )


def send_delete_user_mutation(token: str, user_id: str):
    return send_mutation(
        name='deleteUser',
        token=token,
        variables={'id': user_id}
    )

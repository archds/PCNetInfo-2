from functools import partial
from pathlib import Path

from django.conf import settings

from tests.common.requests import send_request

send_query = partial(
    send_request,
    request_body_dir=Path(settings.BASE_DIR) / 'tests' / 'graphql' / 'queries',
)


def send_computers_query(
        token: str,
        filtration_criteria: dict = None,
        search_string: str = None,
        sort_field: str = None,
):
    return send_query(
        name='computers',
        variables={
            'filter': filtration_criteria,
            'search': search_string,
            'sort': sort_field,
        },
        token=token
    )


def send_computer_query(computer_id: str, token: str):
    return send_query(
        name='computer',
        variables={
            'id': computer_id
        },
        token=token
    )


def send_locations_query(token: str):
    return send_query(name='locations', token=token)


def send_buildings_query(token: str):
    return send_query(name='buildings', token=token)


def send_auth_query(username: str, password: str):
    return send_query(
        name='auth',
        variables={
            'username': username,
            'password': password
        }
    )


def send_verify_token_query(token: str):
    return send_query(
        name='verifyToken',
        variables={'token': token}
    )

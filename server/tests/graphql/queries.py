from functools import partial
from pathlib import Path

from django.conf import settings

from tests.common.requests import send_request

send_query = partial(
    send_request,
    request_body_dir=Path(settings.BASE_DIR) / 'tests' / 'graphql' / 'queries',
)


def send_computers_query(filtration_criteria: dict = None, search_string: str = None, sort_field: str = None):
    return send_query(
        name='computers',
        variables={
            'filter': filtration_criteria,
            'search': search_string,
            'sort': sort_field,
        }
    )


def send_computer_query(computer_id: str):
    return send_query(
        name='computer',
        variables={
            'id': computer_id
        }
    )


def send_locations_query():
    return send_query(name='locations')


def send_buildings_query():
    return send_query(name='buildings')

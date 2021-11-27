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

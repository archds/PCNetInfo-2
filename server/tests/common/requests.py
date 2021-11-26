from functools import lru_cache

from django.test import Client


@lru_cache
def get_request_body(name, file_dir):
    file_path = file_dir / f'{name}.graphql'
    with open(file_path, encoding='utf-8', mode='r') as file:
        return '\n'.join(file.readlines())


def send_request(request_body_dir, name, variables=None, additional_headers=None):
    additional_headers = additional_headers or dict()

    response = Client().post(
        path='/api/',
        data={
            'query': get_request_body(name, request_body_dir),
            'variables': variables
        },
        content_type='application/json',
        **additional_headers
    )

    return response.json()


def post_msinfo(msinfo: bytes):
    response = Client().post(
        path='/api/collect-msinfo/',
        data=msinfo,
        content_type='text/xml'
    )

    return response

from pathlib import Path

from ariadne import (EnumType, MutationType, ObjectType, QueryType, load_schema_from_path)

from dj_service.settings import BASE_DIR
from hardware.models import Computer

SCHEMA_PATH = BASE_DIR / Path('gql_api/schema.graphql')

# GraphQL definition
type_defs = load_schema_from_path(str(SCHEMA_PATH))
resolvers = [
    query := QueryType(),
    mutation := MutationType(),

    pc := ObjectType('Computer'),

    form_factor := EnumType(
        'FormFactor',
        {
            'ATX': Computer.FormFactor.ATX,
            'mATX': Computer.FormFactor.mATX
        }
    ),
    computer_type := EnumType(
        'ComputerType',
        {
            'DESKTOP': Computer.HwType.DESKTOP,
            'LAPTOP': Computer.HwType.LAPTOP
        }
    )
]

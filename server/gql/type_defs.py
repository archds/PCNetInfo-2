from ariadne import (EnumType, MutationType, ObjectType, QueryType, load_schema_from_path)

from dj_service.settings import BASE_DIR, CONFIG_DIR
from hardware.models import Computer

SCHEMA_PATH = BASE_DIR / CONFIG_DIR / 'schema.graphql'

Unit = 'Unit'

# GraphQL definition
type_defs = load_schema_from_path(str(SCHEMA_PATH))
resolvers = [
    query := QueryType(),
    mutation := MutationType(),

    computer := ObjectType('Computer'),
    building := ObjectType('Building'),
    location := ObjectType('Location'),

    unit_type := EnumType('Unit', {'UNIT': Unit}),

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

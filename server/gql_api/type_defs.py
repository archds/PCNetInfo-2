from pathlib import Path

from ariadne import (
    QueryType,
    load_schema_from_path,
    SubscriptionType,
    MutationType,
    ObjectType,
)

from dj_service.settings import BASE_DIR

SCHEMA_PATH = BASE_DIR / Path('gql_api/schema.graphql')

# GraphQL definition
type_defs = load_schema_from_path(str(SCHEMA_PATH))
resolvers = [
    query := QueryType(),
    mutation := MutationType(),
    subscription := SubscriptionType(),
    pc := ObjectType('PC'),
    os := ObjectType('OS'),
    cpu := ObjectType('CPU'),
    videocard := ObjectType('Videocard'),
    filter := ObjectType('Filter'),
]

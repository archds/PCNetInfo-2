import asyncio
from pprint import pprint

from ariadne import (
    QueryType,
    make_executable_schema,
    load_schema_from_path,
    SubscriptionType,
    MutationType,
    convert_kwargs_to_snake_case,
)

from hardware.models import PC

# GraphQL definition
type_defs = load_schema_from_path('gql_api/schema.graphql')

query = QueryType()
mutation = MutationType()
subscription = SubscriptionType()
queues = []
filters = [
    {
        'name': 'Serial number',
        'id': 'serialNumber',
        'options': [
            {
                'name': 'Any',
                'value': 'ANY',
            },
            {
                'name': 'Specified',
                'value': 'SPECIFIED',
            },
            {
                'name': 'Not specified',
                'value': 'NOT_SPECIFIED',
            },
        ]
    }
]


@query.field('hello')
def resolve_hello(*_):
    return 'Hello PCNetInfo!'


@query.field('PC')
def resolve_pc(obj, info, pc_name):
    return PC.objects.get(pc_name=pc_name).to_schema()


@query.field('filters')
def resolve_filters(*_):
    return filters


@query.field('AllPC')
def resolve_allpc(*_):
    return [pc.to_schema() for pc in PC.objects.order_by('label').all()]


@subscription.source('PC')
async def counter_generator(obj, info):
    queue = asyncio.Queue()
    queues.append(queue)
    while True:
        pc = await queue.get()
        queue.task_done()
        yield pc


@subscription.field('PC')
def counter_resolver(pc, info):
    return pc


@mutation.field('updateField')
@convert_kwargs_to_snake_case
def update_field_resolver(obj, info, field, value, pc_name):
    return pc_update(pc_name, {field: value})


@mutation.field('updateLabel')
@convert_kwargs_to_snake_case
def update_field_resolver(obj, info, value, pc_name):
    return pc_update(pc_name, {'label': value})


@query.field('getView')
@convert_kwargs_to_snake_case
def view_resolver(obj, info, view):
    pprint(view)
    return pc_view_controller(view)


resolvers = [query, subscription, mutation]
schema = make_executable_schema(type_defs, resolvers)

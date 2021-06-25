from ariadne import QueryType, make_executable_schema, load_schema_from_path, SubscriptionType, MutationType, convert_kwargs_to_snake_case, ObjectType, convert_camel_case_to_snake
import view.db as db
import asyncio
from markupsafe import Markup

# GraphQL definition
type_defs = load_schema_from_path('schema.graphql')

query = QueryType()
mutation = MutationType()
subscription = SubscriptionType()
queues = []
filters = [
    {
        'name': 'Serial number',
        'id': 'serialNumber',
        'options': [
            'Any',
            'Specified',
            'Not specified',
        ]
    }
]


@query.field('hello')
def resolve_hello(*_):
    return 'Hello PCNetInfo!'


@query.field('PC')
def resolve_pc(obj, info, name):
    return db.get(name)

@query.field('filters')
def resolve_filters(*_):
    return filters


@query.field('AllPC')
def resolve_allpc(*_):
    return db.getAll()


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
    db.update_pc_field(field, value, pc_name)
    return True


resolvers = [query, subscription, mutation]
schema = make_executable_schema(type_defs, resolvers)

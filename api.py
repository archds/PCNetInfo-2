from ariadne import QueryType, make_executable_schema, load_schema_from_path, SubscriptionType
import view.db as db
import asyncio

# GraphQL definition
type_defs = load_schema_from_path('schema.graphql')

query = QueryType()
subscription = SubscriptionType()
queues = []


@query.field('hello')
def resolve_hello(*_):
    return 'Hello PCNetInfo!'


@query.field('PC')
def resolve_pc(obj, info, name):
    return db.get(name)


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


resolvers = [query, subscription]
schema = make_executable_schema(type_defs, resolvers)


from ariadne import (
    QueryType,
    make_executable_schema,
    load_schema_from_path,
    SubscriptionType,
    MutationType,
    convert_kwargs_to_snake_case, ObjectType,
)
from django.db.models import F, Case, When

from hardware.models import PC

# GraphQL definition
type_defs = load_schema_from_path('gql_api/schema.graphql')
resolvers = [
    query := QueryType(),
    mutation := MutationType(),
    subscription := SubscriptionType(),
    pc := ObjectType('PC'),
    os := ObjectType('OS'),
    cpu := ObjectType('CPU'),
    ram := ObjectType('RAM'),
    motherboard := ObjectType('Motherboard'),
    videocard := ObjectType('Videocard'),
    filter := ObjectType('Filter'),
]

schema = make_executable_schema(type_defs, resolvers)


@query.field('hello')
def resolve_hello(*_):
    return 'Hello, PCNetInfo!'


# filters = [
#     {
#         'name': 'Serial number',
#         'id': 'serialNumber',
#         'options': [
#             {
#                 'name': 'Any',
#                 'value': 'ANY',
#             },
#             {
#                 'name': 'Specified',
#                 'value': 'SPECIFIED',
#             },
#             {
#                 'name': 'Not specified',
#                 'value': 'NOT_SPECIFIED',
#             },
#         ]
#     }
# ]




# @subscription.source('PC')
# async def counter_generator(obj, info):
#     queue = asyncio.Queue()
#     queues.append(queue)
#     while True:
#         pc = await queue.get()
#         queue.task_done()
#         yield pc
#
#
# @subscription.field('PC')
# def counter_resolver(pc, info):
#     return pc


# @mutation.field('updateField')
# @convert_kwargs_to_snake_case
# def update_field_resolver(obj, info, field, value, pc_name):
#     PC.objects.filter(pc_name=pc_name, **{field: value})
#     return True
#
#
# @mutation.field('updateLabel')
# @convert_kwargs_to_snake_case
# def update_field_resolver(obj, info, value, pc_name):
#     PC.objects.filter(pc_name=pc_name, **{'label': value})
#     return True
#
#
# @query.field('getView')
# @convert_kwargs_to_snake_case
# def view_resolver(obj, info, view):
#     sorters = {
#         'label': 'label',
#         'cpu': F('cpu_threads') * F('cpu_clock'),
#         'form': 'form_factor_enum',
#     }
#     filters = {
#         'serial_number': {
#             'SPECIFIED': False,
#             'NOT_SPECIFIED': True,
#         }
#     }
#
#     query = PC.objects
#
#     if view['sort'] == 'form':
#         query = query.annotate(
#             form_factor_enum=Case(
#                 When(form_factor='ATX', then=0),
#                 When(form_factor='MicroATX', then=1),
#                 When(form_factor='Mini-ITX', then=2),
#             )
#         )
#
#     query = query.order_by(sorters[view['sort']])
#     for filter_type, filter_value in view['filter'].items():
#         if filter_value in filters[filter_type]:
#             filter_value = filters[filter_type].get(filter_value)
#             if isinstance(filter_value, bool):
#                 query = query.filter(**{f'{filter_type}__isnull': filter_value})
#
#     if view['sort'] == 'cpu' or view['sort'] == 'form':
#         query = query.reverse()
#
#     if search := view.get('search'):
#         if search_type := search.get('search_type'):
#             query = query.filter(**{f'{search_type}__contains': search["search_value"]})
#         else:
#             query = query.filter(**{'label__contains': search['search_value']})
#
#     return [pc.to_schema() for pc in query]





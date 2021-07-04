from ariadne import convert_kwargs_to_snake_case
from django.db.models import F, When, Case

import gql_api.type_defs as gqt
from hardware.models import PC


@gqt.query.field('hello')
def resolve_hello(*_):
    return 'Hello PCNetInfo!'


@gqt.query.field('AllPC')
def resolve_allpc(*_):
    return [pc for pc in PC.objects.order_by('label').all()]


@gqt.query.field('PC')
def resolve_pc(obj, info, name):
    return PC.objects.get(pc_name=name)


@gqt.query.field('getView')
@convert_kwargs_to_snake_case
def view_resolver(obj, info, view):
    sorters = {
        'label': 'label',
        'cpu': F('cpu_threads') * F('cpu_clock'),
        'form': 'form_factor_enum',
    }
    filters = {
        'serial_number': {
            'SPECIFIED': False,
            'NOT_SPECIFIED': True,
        }
    }

    query = PC.objects

    if view['sort'] == 'form':
        query = query.annotate(
            form_factor_enum=Case(
                When(form_factor='ATX', then=0),
                When(form_factor='MicroATX', then=1),
                When(form_factor='Mini-ITX', then=2),
            )
        )

    query = query.order_by(sorters[view['sort']])
    for filter_type, filter_value in view['filter'].items():
        if filter_value in filters[filter_type]:
            filter_value = filters[filter_type].get(filter_value)
            if isinstance(filter_value, bool):
                query = query.filter(**{f'{filter_type}__isnull': filter_value})

    if view['sort'] == 'cpu' or view['sort'] == 'form':
        query = query.reverse()

    if search := view.get('search'):
        if search_type := search.get('search_type'):
            query = query.filter(**{f'{search_type}__contains': search["search_value"]})
        else:
            query = query.filter(**{'label__contains': search['search_value']})

    return [pc for pc in query]


@gqt.mutation.field('createPC')
@convert_kwargs_to_snake_case
def create_pc_resolver(obj, info, input_data) -> bool:
    PC.objects.create(**input_data)
    return True

from typing import Dict, Optional

import gql_api.type_defs as gqt
from hardware.models import PC


@gqt.query.field('hello')
def resolve_hello(*_):
    return 'Hello PCNetInfo!'


@gqt.query.field('AllPC')
def resolve_all_pc(obj, info, input: Optional[Dict] = None):
    query = PC.objects.all()

    if input is None:
        return query

    if filter_input := input.get('filter'):
        pass

    if search_input := input.get('search'):
        query = query.filter(label__startswith='PC')

    if sort_input := input.get('sort'):
        print(sort_input)

    return query


@gqt.query.field('getPC')
def resolve_get_pc(obj, info, name: str):
    return PC.objects.get(pc_name=name)

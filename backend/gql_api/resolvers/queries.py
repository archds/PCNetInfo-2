from typing import Dict, Optional

import gql_api.type_defs as gqt
from hardware.models import PC


@gqt.query.field('hello')
def _(*_):
    return 'Hello PCNetInfo!'


@gqt.query.field('AllPC')
def _(obj, info, gql_input: Optional[Dict] = None):
    query = PC.objects.all()

    if gql_input is None:
        return query

    if filter_input := gql_input.get('filter'):
        pass

    if search_input := gql_input.get('search'):
        query = query.filter(label__startswith='PC')

    if sort_input := gql_input.get('sort'):
        pass

    return query


@gqt.query.field('getPC')
def _(obj, info, name: str):
    return PC.objects.get(pc_name=name)

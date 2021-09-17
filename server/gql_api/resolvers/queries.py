from pprint import pprint
from typing import Dict, Optional

from django.db.models import Q

import gql_api.type_defs as gqt
from gql_api.actions.filter import filter_query
from gql_api.actions.sort import sort
from hardware.models import PC


@gqt.query.field('hello')
def resolve_hello(*_):
    return 'Hello PCNetInfo!'


@gqt.query.field('AllPC')
def resolve_all_pc(obj, info, input: Optional[Dict] = None):
    pprint(input)
    query = PC.objects.all()

    if input is None:
        return query

    if filter_input := input.get('filter'):
        query = filter_query(filter_input, query)

    if search_input := input.get('search'):
        query = query.filter(
            Q(label__contains=search_input)
            | Q(pc_name__contains=search_input)
            | Q(cpu_name__contains=search_input)
            | Q(motherboard_manufacturer__contains=search_input)
            | Q(videocard__contains=search_input)
            | Q(username__contains=search_input)
            | Q(user__contains=search_input)
            | Q(location__contains=search_input)
            | Q(comment__contains=search_input)
        )

    if sort_input := input.get('sort'):
        query = sort(sort_input, query)

    return query


@gqt.query.field('getPC')
def resolve_get_pc(obj, info, name: str):
    return PC.objects.get(pc_name=name)

from typing import Dict, Optional

from django.db.models import Q

import gql.type_defs as gqt
from gql.actions.filter import filter_query
from gql.actions.sort import sort
from gql.errors import ReadableError
from gql.resolvers.presentation.computer import gql_computer_convert
from hardware.models import Computer, Location, User


@gqt.query.field('hello')
def resolve_hello(*_):
    return 'Hello PCNetInfo!'


@gqt.query.field('computers')
def resolve_all_pc(obj, info, input: Optional[Dict] = None):
    query = Computer.objects.all()

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

    return [gql_computer_convert(comp) for comp in query]


@gqt.query.field('computer')
def resolve_get_pc(obj, info, id: str):
    query = Computer.objects.filter(pk=int(id))

    if not query.exists():
        raise ReadableError(
            message=f'Computer does not found in database!'
        )

    return gql_computer_convert(query.first())


@gqt.query.field('locations')
def resolve_locations(obj, info):
    return Location.objects.all()


@gqt.query.field('users')
def resolve_users(obj, info):
    return User.objects.all()

from logging import getLogger
from typing import Dict, Optional

from django.db.models import Q
from graphql import GraphQLResolveInfo

import gql.type_defs as gqt
from gql.actions.filter import filter_query
from gql.actions.sort import sort
from gql.errors import ReadableError
from gql.resolvers.auth import login_required
from gql.resolvers.presentation.computer import gql_computer_convert
from hardware.models import Building, Computer, ComputerUser, Location, UserRole

logger = getLogger(__file__)


@gqt.query.field('hello')
def resolve_hello(obj, info: GraphQLResolveInfo):
    return 'Hello PCNetInfo!'


@gqt.query.field('computers')
@login_required
def resolve_all_pc(obj, info, input: Optional[Dict] = None):
    query = Computer.objects.all()

    if input is None:
        return query

    if filter_input := input.get('filter'):
        query = filter_query(filter_input, query)

    if search_input := input.get('search'):
        query = query.filter(
            Q(label__contains=search_input)
            | Q(name__contains=search_input)
            | Q(cpu_name__contains=search_input)
            | Q(videocard_name__contains=search_input)
            | Q(username__contains=search_input)
            | Q(comment__contains=search_input)
        )

    if sort_input := input.get('sort'):
        query = sort(sort_input, query)

    return [gql_computer_convert(comp) for comp in query]


@gqt.query.field('computer')
@login_required
def resolve_get_pc(obj, info, id: str):
    query = Computer.objects.filter(pk=int(id))

    if not query.exists():
        raise ReadableError(
            message=f'Computer does not found in database!'
        )

    return gql_computer_convert(query.first())


@gqt.query.field('locations')
@login_required
def resolve_locations(obj, info):
    return Location.objects.all()

@gqt.query.field('buildingLocations')
def resolve_locations(obj, info, buildingId: str):
    return Location.objects.filter(building_id=buildingId)

@gqt.query.field('users')
@login_required
def resolve_users(obj, info):
    return ComputerUser.objects.all()

@gqt.query.field('buildings')
@login_required
def resolve_buildings(*_):
    return Building.objects.all()


@gqt.query.field('users')
@login_required
def resolve_users(*_):
    return [
        {
            'id': user.pk,
            'firstName': user.first_name,
            'lastName': user.last_name,
            'roles': [
                {'title': role.title, 'priority': role.priority}
                for role in user.roles.all()
            ],
            'computers': [gql_computer_convert(comp) for comp in user.computers.all()]
        }
        for user in ComputerUser.objects.all()
    ]


@gqt.query.field('userRoles')
@login_required
def resolve_user_roles(*_):
    return [
        {
            'id': role.pk,
            'title': role.title,
            'priority': role.priority,
        }
        for role in UserRole.objects.all()
    ]

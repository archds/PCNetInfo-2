from gql import type_defs as gqt
from gql.resolvers.auth import login_required
from hardware.models import ComputerUser, UserRole


@gqt.mutation.field('createUser')
@login_required
def create_user(obj, info, input: dict):
    user = ComputerUser.objects.create(
        first_name=input['firstName'],
        last_name=input.get('lastName'),
    )

    if role_titles := input.get('roleTitles'):
        user.roles.add(
            *[
                UserRole.objects.get_or_create(title=title)[0]
                for title in role_titles
            ]
        )

    return gqt.Unit


@gqt.mutation.field('updateUser')
@login_required
def update_user(obj, info, id: str, input: dict):
    user = ComputerUser.objects.filter(pk=id).update(
        first_name=input['firstName'],
        last_name=input.get('lastName')
    )

    if roles := input.get('roleTitles'):
        ComputerUser.objects.get(pk=id).roles.set([UserRole.objects.get_or_create(title=title)[0] for title in roles])

    return gqt.Unit


@gqt.mutation.field('deleteUser')
@login_required
def delete_user(obj, info, id: str):
    ComputerUser.objects.filter(pk=id).delete()

    return gqt.Unit


@gqt.mutation.field('createUserRole')
@login_required
def create_user_role(obj, info, input: dict):
    UserRole.objects.create(
        title=input['title'],
        priority=input.get('priority')
    )

    return gqt.Unit


@gqt.mutation.field('deleteUserRole')
@login_required
def delete_user_role(obj, info, id: str):
    UserRole.objects.filter(pk=id).delete()

    return gqt.Unit

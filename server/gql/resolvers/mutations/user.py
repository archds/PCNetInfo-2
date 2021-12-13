from gql import type_defs as gqt
from gql.resolvers.auth import login_required
from hardware.models import ComputerUser, UserRole


@gqt.mutation.field('createUser')
@login_required
def create_user(obj, info, input: dict):
    ComputerUser.objects.create(
        first_name=input['firstName'],
        last_name=input.get('lastName'),
    )

    return gqt.Unit


@gqt.mutation.field('createUserRole')
@login_required
def create_user_role(obj, info, input: dict):
    UserRole.objects.create(
        title=input['title'],
        priority=input.get('priority')
    )


@gqt.mutation.field('deleteUserRole')
@login_required
def delete_user_role(obj, info, id: str):
    UserRole.objects.filter(pk=id).delete()

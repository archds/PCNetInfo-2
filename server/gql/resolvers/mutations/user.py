from gql import type_defs as gqt
from hardware.models import User, UserRole


@gqt.mutation.field('createUser')
def create_user(obj, info, input: dict):
    role = input.get('role')
    if role:
        role, created = UserRole.objects.get_or_create(title=role)

    User.objects.create(
        first_name=input['firstName'],
        last_name=input['lastName'],
        role=role,
    )

    return gqt.Unit
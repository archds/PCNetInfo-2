import gql_api.type_defs as gqt
from hardware.models import User


@gqt.user.field('id')
def resolve_id(user_obj: User, info):
    return user_obj.pk


@gqt.user.field('firstName')
def resolve_first_name(user_obj: User, info):
    return user_obj.first_name


@gqt.user.field('lastName')
def resolve_last_name(user_obj: User, info):
    return user_obj.last_name


@gqt.user.field('role')
def resolve_role(user_obj: User, info):
    return user_obj.role.title


@gqt.user.field('computer')
def resolve_computer(user_obj: User, info):
    return user_obj.computer

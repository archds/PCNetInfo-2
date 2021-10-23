import gql_api.type_defs as gqt
from hardware.models import Location


@gqt.location.field('id')
def resolve_id(loc_obj: Location, info):
    return loc_obj.pk


@gqt.location.field('building')
def resolve_building(loc_obj: Location, info):
    return {
        'id': loc_obj.building.pk,
        'street': loc_obj.building.street,
        'house': loc_obj.building.house,
    }


@gqt.location.field('cabinet')
def resolve_cabinet(loc_obj: Location, info):
    return loc_obj.cabinet


@gqt.location.field('floor')
def resolve_floor(loc_obj: Location, info):
    return loc_obj.floor


@gqt.location.field('employees')
def resolve_employees(loc_obj: Location, info):
    return loc_obj.employees


@gqt.location.field('description')
def resolve_description(loc_obj: Location, info):
    return loc_obj.description

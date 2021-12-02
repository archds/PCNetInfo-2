from hardware.models import Building, Location


def gql_building_convert(build: Building) -> dict:
    return {
        'id': build.pk,
        'street': build.street,
        'house': build.house,
    }


def gql_location_convert(loc: Location) -> dict:
    return {
        'id': loc.id,
        'building': gql_building_convert(loc.building),
        'cabinet': loc.cabinet,
        'floor': loc.floor,
        'description': loc.description,
    }

from typing import Dict

from django.db.models import QuerySet, Q


def filter_query(filter_input: Dict, query: QuerySet) -> QuerySet:
    mapping = {
        'SPECIFIED': False,
        'NOT_SPECIFIED': True
    }

    filters = []
    if serial := filter_input.get('serialNumber'):
        filters.append(
            Q(serial_number__isnull=mapping[serial])
        )

    if location := filter_input.get('location'):
        filters.append(
            Q(location__exact='') if mapping[location] else ~Q(location__exact='')
        )

    if form_factor := filter_input.get('formFactor'):
        filters.append(
            Q(form_factor__exact=form_factor)
        )

    return query.filter(*filters)

from enum import Enum
from typing import Dict

from django.db.models import QuerySet, F

__all__ = ['sort']


class SortField(Enum):
    LABEL = 'LABEL'
    SERIAL = 'SERIAL'
    CPU = 'CPU'
    MEMORY = 'MEMORY'


def sort(sort_input: Dict, query: QuerySet) -> QuerySet:
    sort_field = SortField(sort_input['field'])

    if sort_field == SortField.LABEL:
        return query.order_by('-label')

    if sort_field == SortField.SERIAL:
        return query.order_by('-serial_number')

    if sort_field == SortField.CPU:
        query = query.annotate(
            performance=F('cpu_threads') * F('cpu_clock')
        )
        return query.order_by('-performance')

    if sort_field == SortField.MEMORY:
        return query.order_by('-ram')

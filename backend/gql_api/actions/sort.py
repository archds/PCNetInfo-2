from enum import Enum
from typing import Dict

from django.db.models import QuerySet

class SortField(Enum):
    LABEL = 'LABEL'
    SERIAL = 'SERIAL'
    PERFORMANCE = 'PERFORMANCE'


def sort(sort_input: Dict, query: QuerySet) -> QuerySet:
    sort_field = SortField(sort_input['field'])

    if sort_field == SortField.LABEL:
        return query.order_by()


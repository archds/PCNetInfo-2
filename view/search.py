import json

import view.db as db
from nested_lookup import get_occurrences_and_values


def get():
    PCs = db.getAll(raw=True)
    find_by = [
        'cpu_name',
        'cpu_threads',
    ]
    return PCs


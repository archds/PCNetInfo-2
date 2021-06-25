import json

import view.db as db


def get():
    PCs = db.getAll(raw=True)
    find_by = [
        'cpu_name',
        'cpu_threads',
    ]
    return PCs


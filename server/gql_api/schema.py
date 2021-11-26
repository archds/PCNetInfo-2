import importlib
import pkgutil
from types import ModuleType
from typing import Dict

from ariadne import make_executable_schema

import gql_api.resolvers as root_resolvers
from gql_api.type_defs import resolvers, type_defs


def import_submodules(package, recursive: bool = True) -> Dict[str, ModuleType]:
    """
    Рекурсивно импортирует все модули в папке.

    :param package:
    :param recursive:
    :return:
    """

    if isinstance(package, str):
        package = importlib.import_module(package)
    elif not isinstance(package, ModuleType):
        raise TypeError('must provide a module path or an inported module')

    results = {}

    for loader, name, is_pkg in pkgutil.walk_packages(package.__path__):
        full_name = package.__name__ + '.' + name
        results[full_name] = importlib.import_module(full_name)
        if recursive and is_pkg:
            results.update(import_submodules(full_name))

    return results


import_submodules(root_resolvers)

schema = make_executable_schema(type_defs, resolvers)

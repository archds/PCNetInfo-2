import importlib
import pkgutil
from types import ModuleType
from typing import Union

from ariadne import make_executable_schema

import gql.resolvers as root_resolvers
from gql.type_defs import resolvers, type_defs


def import_submodules(package: Union[ModuleType, str], recursive: bool = True) -> None:
    if isinstance(package, str):
        package = importlib.import_module(package)
    elif not isinstance(package, ModuleType):
        raise TypeError('must provide a module path or an imported module')

    for loader, name, is_pkg in pkgutil.walk_packages(package.__path__, package.__name__ + '.'):
        importlib.import_module(name)
        if recursive and is_pkg:
            import_submodules(package=name)


import_submodules(root_resolvers)  # noqa

schema = make_executable_schema(type_defs, resolvers)

from dataclasses import dataclass
from enum import Enum
from typing import Optional


@dataclass
class OS:
    name: str
    architecture: str


@dataclass
class Videocard:
    name: str
    memory: Optional[int]


@dataclass
class Processor:
    name: str
    clock: int
    cores: int
    threads: int


class Locale(Enum):
    eng = 'en-US'
    rus = 'ru-RU'

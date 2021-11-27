from dataclasses import dataclass


@dataclass
class OS:
    name: str
    architecture: str


@dataclass
class Videocard:
    name: str
    memory: int


@dataclass
class Processor:
    name: str
    clock: int
    cores: int
    threads: int

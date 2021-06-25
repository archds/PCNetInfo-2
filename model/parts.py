from pydantic import BaseModel, Field
from typing import Optional


class CPU(BaseModel):
    name: Optional[str] = Field(alias='Name')
    clock: Optional[str] = Field(alias='MaxClockSpeed')
    cores: Optional[str] = Field(alias='NumberOfCores')
    threads: Optional[str] = Field(alias='NumberOfLogicalProcessors')
    socket: Optional[str] = Field(alias='SocketDesignation')

    class Config:
        anystr_strip_whitespace = True


class RAM(BaseModel):
    capacity: Optional[int] = Field(alias='CsPhyicallyInstalledMemory')
    banks: Optional[list] = Field(alias='Memory')


class Motherboard(BaseModel):
    manufacturer: Optional[str] = Field(alias='Manufacturer')
    product: Optional[str] = Field(alias='Product')
    serial: Optional[str] = Field(alias='SerialNumber')


class Videocard(BaseModel):
    name: Optional[str] = Field(alias='Caption')
    resX: Optional[str] = Field(alias='CurrentHorizontalResolution')
    resY: Optional[str] = Field(alias='CurrentVerticalResolution')
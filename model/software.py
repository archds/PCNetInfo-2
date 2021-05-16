from pydantic import BaseModel, Field
from typing import Optional


class OS(BaseModel):
    name: Optional[str] = Field(alias='WindowsProductName')
    version: Optional[str] = Field(alias='WindowsVersion')
    architecture: Optional[str] = Field(alias='OsArchitecture')

    class Config:
        anystr_strip_whitespace = True
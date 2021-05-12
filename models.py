import db
import json
from typing import Union, Optional
from peewee import IntegrityError
from datetime import datetime
from pydantic import BaseModel, Field, parse


def DictFormatter(obj):
    if obj is None:
        return {}
    elif isinstance(obj, list):
        return obj[-1]
    else:
        return obj


def PowerShellParse(data, addr):
    print(data)
    data['ip'] = addr
    data['Videocard'] = DictFormatter(data['Videocard'])
    data['Motherboard'] = DictFormatter(data['Motherboard'])
    data['CsProcessors'] = DictFormatter(data['CsProcessors'])
    data['OsArchitecture'] = data['OsArchitecture'].replace('?', '')
    if not isinstance(data['CsProcessors'], list):
        data['CsProcessors'] = [data['CsProcessors']]
    if not isinstance(data['Memory'], list):
        data['Memory'] = [data['Memory']]
    return Computer.parse_obj({
        'type': data['Hardwaretype'],
        'name': data['CsCaption'],
        'domain': data['CsDomain'],
        'ip': data['ip'],
        'username': data['CsUserName'],
        'timezone': data['TimeZone'],
        'os': OS.parse_obj(data),
        'cpu': CPU.parse_obj(data['CsProcessors'][0]),
        'ram': RAM.parse_obj(data),
        'motherboard': Motherboard.parse_obj(data['Motherboard']),
        'videocard': Videocard.parse_obj(data['Videocard']),
        'monitors': [Monitor.parse_obj(monitor) for monitor in data['Monitors']],
    })


class Monitor(BaseModel):
    model: Optional[str] = Field(alias='Model')
    serial: Optional[str] = Field(alias='SerialNumber')

    def post(self, pc_object: db.PC):
        try:
            db.Monitor.create(**{
                'serial_number': self.serial,
                'model': self.model,
            }, pc=pc_object)
        except IntegrityError:
            db.Monitor.update(pc=pc_object).where(db.Monitor.serial_number == self.serial).execute()


class OS(BaseModel):
    name: Optional[str] = Field(alias='WindowsProductName')
    version: Optional[str] = Field(alias='WindowsVersion')
    architecture: Optional[str] = Field(alias='OsArchitecture')

    class Config:
        anystr_strip_whitespace = True


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


class Computer(BaseModel):
    type: Optional[str]
    name: str
    domain: Optional[str]
    username: Optional[str]
    timezone: Optional[str]
    ip: Optional[str]
    os: OS
    cpu: CPU
    ram: RAM
    motherboard: Motherboard
    videocard: Videocard
    monitors: list[Monitor]

    def post(self):
        data = {
            'hardware_type': self.type,
            'os_name': self.os.name,
            'os_version': self.os.version,
            'os_architecture': self.os.architecture,
            'pc_name': self.name,
            'domain': self.domain,
            'ip': self.ip,
            'cpu_name': self.cpu.name,
            'cpu_clock': self.cpu.clock,
            'cpu_cores': self.cpu.cores,
            'cpu_threads': self.cpu.threads,
            'cpu_socket': self.cpu.socket,
            'ram': self.ram.capacity / 1048576,
            'motherboard_manufacturer': self.motherboard.manufacturer,
            'motherboard_product': self.motherboard.product,
            'motherboard_serial': self.motherboard.serial,
            'videocard': self.videocard.name,
            'resX': self.videocard.resX,
            'resY': self.videocard.resY,
            'username': self.username,
            'timezone': self.timezone,
        }
        c = 0
        for memory in self.ram.banks:
            for key, value in memory.items():
                data[f'ram{c}_{key}'] = value
            c += 1

        schema_response = {
            'Name': self.name,
            'Domain': self.domain,
            'IP': self.ip,
            'OS': f'{self.os.name}, {self.os.version}, {self.os.architecture}',
            'CPU': f'{self.cpu.name}, {self.cpu.clock} MHz; C/T: {self.cpu.cores}/{self.cpu.threads}; socket: {self.cpu.socket}',
            'Memory': f'Capacity: {self.ram.capacity / 1048576} GB; banks: {len(self.ram.banks)}',
            'Motherboard': f'{self.motherboard.manufacturer} {self.motherboard.product}',
            'Videocard': self.videocard.name,
            'Monitors': self.monitors,
            'Not transited': [i for i in data if data[i] is None],
        }
        with open('consoleResponse.txt', encoding='UTF-8') as art:
            response = f'\n{art.read()}\n'
            now = datetime.now().strftime('%H:%M:%S, %d:%m:%Y')
            for key, value in schema_response.items():
                if isinstance(value, list) and key == 'Monitors':
                    response += 'Monitors: '
                    for monitor in value:
                        response += f'{monitor.model}, '
                    response = response.rstrip(', ')
                    response += '\n'
                else:
                    response += f'{key}: {value}\n'

        try:
            pc = db.PC.create(
                **data,
                updated=datetime.now()
            )
            response += f'\n{now} - New database object created'
        except IntegrityError:
            data.pop('pc_name')
            db.PC.update(**data, updated=datetime.now()).where(db.PC.pc_name == self.name).execute()
            pc = db.PC.get(db.PC.pc_name == self.name)
            response += f'\n{now} - Existed database object updated!\n'

        for monitor in self.monitors:
            Monitor.post(monitor, pc)
        return response
import model.db as db
from datetime import datetime
from model.parts import *
from model.software import *
from pydantic import BaseModel, Field
from typing import Optional


class Monitor(BaseModel):
    model: Optional[str] = Field(alias='Model')
    serial: Optional[str] = Field(alias='SerialNumber')

    def post(self, pc_object: db.PC):
        try:
            db.Monitor.create(**{
                'serial_number': self.serial,
                'model': self.model,
            }, pc=pc_object)
        except db.IntegrityError:
            db.Monitor.update(pc=pc_object).where(db.Monitor.serial_number == self.serial).execute()


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
        with open('../consoleResponse.txt', encoding='UTF-8') as art:
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
        except db.IntegrityError:
            data.pop('pc_name')
            db.PC.update(**data, updated=datetime.now()).where(db.PC.pc_name == self.name).execute()
            pc = db.PC.get(db.PC.pc_name == self.name)
            response += f'\n{now} - Existed database object updated!\n'

        for monitor in self.monitors:
            Monitor.post(monitor, pc)
        return response

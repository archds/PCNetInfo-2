from peewee import *
import json
from pathlib import Path
from datetime import datetime

DATABASE_PATH = Path.cwd().joinpath('database').joinpath('test.db')
conn = SqliteDatabase(DATABASE_PATH)


class BaseModel(Model):
    class Meta:
        database = conn


class PC(BaseModel):
    pc_id = AutoField(column_name='pc_id')
    hardware_type = CharField(max_length=50, null=True)
    os_name = CharField(max_length=50, null=True)
    os_version = CharField(max_length=50, null=True)
    os_architecture = CharField(max_length=50, null=True)
    pc_name = CharField(max_length=50, unique=True)
    domain = CharField(max_length=50, null=True)
    ip = IPField(null=True)
    cpu_name = CharField(max_length=100, null=True)
    cpu_clock = SmallIntegerField(null=True)
    cpu_cores = SmallIntegerField(null=True)
    cpu_threads = SmallIntegerField(null=True)
    cpu_socket = CharField(max_length=10, null=True)
    motherboard_manufacturer = CharField(max_length=50, null=True)
    motherboard_product = CharField(max_length=100, null=True)
    motherboard_serial = CharField(max_length=100, null=True)
    ram = IntegerField(null=True)
    ram0_Configuredclockspeed = IntegerField(null=True)
    ram0_Capacity = IntegerField(null=True)
    ram1_Configuredclockspeed = IntegerField(null=True)
    ram1_Capacity = IntegerField(null=True)
    ram2_Configuredclockspeed = IntegerField(null=True)
    ram2_Capacity = IntegerField(null=True)
    ram3_Configuredclockspeed = IntegerField(null=True)
    ram3_Capacity = IntegerField(null=True)
    videocard = CharField(max_length=100, null=True)
    resX = IntegerField(null=True)
    resY = IntegerField(null=True)
    username = CharField(max_length=100, null=True)
    timezone = CharField(max_length=100, null=True)
    user = CharField(max_length=200, null=True)
    serial_number = IntegerField(null=True)
    location = CharField(max_length=200, null=True)
    updated = DateTimeField()
    comment = TextField(null=True)
    label = CharField(max_length=100, null=True)

    class Meta:
        table_name = 'pc'


class Monitor(BaseModel):
    serial_number = CharField(max_length=50, unique=True)
    model = CharField(max_length=100)
    user = CharField(max_length=100, null=True)
    pc = ForeignKeyField(PC, backref='pcs')

    class Meta:
        table_name = 'monitor'


def getAll():
    allPC = [get(pc['pc_name']) for pc in PC.select().dicts().execute()]
    return sorted(allPC, key=lambda PC: PC['comment'])


def get(pc_name):
    def badDataMark(object: dict):
        ignored = [
            'label',
            'user',
            'serial_number',
            'location',
        ]
        for key in object.keys():
            if key in ignored:
                continue
            if isinstance(object[key], str):
                object[key] = object[key].replace('?', '').replace('()', '').strip()
                if not object[key]:
                    object[key] = 'No data'
                object[key] = " ".join(object[key].split())
            elif isinstance(object[key], dict):
                object[key] = badDataMark(object[key])
        return object

    pc = PC.select().where(PC.pc_name == pc_name).dicts().get()
    try:
        monitors = Monitor.select().where(Monitor.pc == pc['pc_id']).dicts().get()
    except DoesNotExist:
        monitors = []
    GB = 1073741824
    memoryBanks = [
        {'speed': pc['ram0_Configuredclockspeed'], 'capacity': pc['ram0_Capacity']},
        {'speed': pc['ram1_Configuredclockspeed'], 'capacity': pc['ram1_Capacity']},
        {'speed': pc['ram2_Configuredclockspeed'], 'capacity': pc['ram2_Capacity']},
        {'speed': pc['ram3_Configuredclockspeed'], 'capacity': pc['ram3_Capacity']},
    ]

    c = 0
    for memoryBank in memoryBanks:
        if memoryBank['capacity']:
            memoryBanks[c]['capacity'] = memoryBank['capacity'] / GB
        c += 1

    response = {
        'id': pc.pop('pc_id', None),
        'name': pc.pop('pc_name', None),
        'domain': pc.pop('domain', None),
        'ip': pc.pop('ip', None),
        'hardware_type': pc.pop('hardware_type', None),
        'username': pc.pop('username', None),
        'timezone': pc.pop('timezone', None),
        'user': pc.pop('user', None),
        'serial_number': pc.pop('serial_number', None),
        'location': pc.pop('location', None),
        'updated': pc.pop('updated', None),
        'comment': pc.pop('comment', None),
        'label': pc.pop('label', None),
        'os': {
            'name': pc.pop('os_name', None),
            'version': pc.pop('os_version', None),
            'architecture': pc.pop('os_architecture', None)
        },
        'cpu': {
            'name': pc.pop('cpu_name', None),
            'clock': pc.pop('cpu_clock', None),
            'cores': pc.pop('cpu_cores', None),
            'threads': pc.pop('cpu_threads', None),
            'socket': pc.pop('cpu_socket', None),
        },
        'motherboard': {
            'manufacturer': pc.pop('motherboard_manufacturer', None),
            'product': pc.pop('motherboard_product', None),
            'serial': pc.pop('motherboard_serial', None),
        },
        'ram': {
            'size': pc.pop('ram', None),
            'banks': memoryBanks
        },
        'videocard': {
            'name': pc.pop('videocard', None),
            'resX': pc.pop('resX', None),
            'resY': pc.pop('resY', None),
        },
        'monitors': [monitors]
    }
    response['username'] = response['username'].split('\\')[1]
    response = badDataMark(response)
    response['timezone'] = response['timezone'].rstrip(' , -')
    response['os']['architecture'] = response['os']['architecture'] + 'bit'
    response['cpu']['clock'] = round(response['cpu']['clock'], 1)
    return response


def update_pc_field(field, value, pc_name):
    data = {
        field: value,
        'updated': datetime.now()
    }
    PC.update(**{key: value for key, value in data.items()}).where(
        PC.pc_name == pc_name).execute()


def delete(type, deviceID):
    if type == 'pc':
        PC.delete().where(PC.pc_name == deviceID).execute()
    else:
        raise TypeError(f'Unknown type - {type}')
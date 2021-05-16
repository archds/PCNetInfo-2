import re
from datetime import datetime
from model.db import PC, Monitor
from model.db import conn

conn.connect()
conn.create_tables([PC, Monitor])


def getAll(raw=False):
    if raw:
        return PC.select().dicts().get()
    allPC = [get(pc['pc_name']) for pc in PC.select().dicts().execute()]
    return sorted(allPC, key=lambda PC: PC['label'])


def get(pc_name):
    def badDataMark(object: dict):
        ignored = [
            'label',
            'user',
            'serial_number',
            'location',
            'comment',
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

    def rename_cpu(name: str):
        special_ignored = ['(R)', '(TM)', 'CPU ', '@', '(tm)']
        for char in special_ignored:
            name = name.replace(char, '')
        match_clock = re.search(r'\d\.\d{1,2}\wHz', name)
        match_apu = name.find('APU')
        if match_apu:
            name = name[:match_apu]
        if match_clock:
            idx = match_clock.span()[0]
            name = name[:idx].strip()
        return name

    pc = PC.select().where(PC.pc_name == pc_name).dicts().get()
    try:
        monitors = Monitor.select().where(Monitor.pc == pc['pc_id']).dicts().get()
    except Monitor.DoesNotExist:
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
    response = badDataMark(response)
    response['timezone'] = response['timezone'].rstrip(' , -')
    response['os']['architecture'] = response['os']['architecture'] + 'bit'
    response['cpu']['clock'] = round(response['cpu']['clock'], 1)
    response['cpu']['name'] = rename_cpu(response['cpu']['name'])
    return response


def update_pc_field(field, value, pc_name):
    def recalc_ram():
        banks = get(pc_name)['ram']['banks']
        return sum([int(bank['capacity']) for bank in banks if bank['capacity']])

    data = {
        field: value,
        'updated': datetime.now()
    }
    PC.update(**data).where(PC.pc_name == pc_name).execute()
    if 'ram' in field:
        PC.update(ram=recalc_ram()).where(PC.pc_name == pc_name).execute()


def delete_pc(pc_name):
    PC.delete().where(PC.pc_name == pc_name).execute()


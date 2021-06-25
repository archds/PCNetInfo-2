from model.hardware import Computer, Monitor
from model.software import OS
from model.parts import *


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

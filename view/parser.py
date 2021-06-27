def DictFormatter(obj):
    if obj is None:
        return {}
    elif isinstance(obj, list):
        return obj[-1]
    else:
        return obj


def powershell(data, addr):
    data['ip'] = addr
    data['Videocard'] = DictFormatter(data['Videocard'])
    data['Motherboard'] = DictFormatter(data['Motherboard'])
    data['CsProcessors'] = DictFormatter(data['CsProcessors'])
    data['OsArchitecture'] = data['OsArchitecture'].replace('?', '')
    if not isinstance(data['CsProcessors'], list):
        data['CsProcessors'] = [data['CsProcessors']]
    if not isinstance(data['Memory'], list):
        data['Memory'] = [data['Memory']]
    parsed_data = {
        'hardware_type': data['Hardwaretype'],
        'pc_name': data['CsCaption'],
        'domain': data['CsDomain'],
        'ip': data['ip'],
        'username': data['CsUserName'],
        'timezone': data['TimeZone'],
        'os_name': data['WindowsProductName'],
        'os_version': data['WindowsVersion'],
        'os_architecture': data['OsArchitecture'],
        'cpu_name': data['CsProcessors'][0]['Name'],
        'cpu_clock': data['CsProcessors'][0]['CurrentClockSpeed'],
        'cpu_cores': data['CsProcessors'][0]['NumberOfCores'],
        'cpu_threads': data['CsProcessors'][0]['NumberOfLogicalProcessors'],
        'cpu_socket': data['CsProcessors'][0]['SocketDesignation'],
        'motherboard_manufacturer': data['Motherboard']['Manufacturer'],
        'motherboard_product': data['Motherboard']['Product'],
        'motherboard_serial': data['Motherboard']['SerialNumber'],
        'ram': data['CsPhyicallyInstalledMemory'],
        'videocard': data['Videocard']['Caption'],
        'resX': data['Videocard']['CurrentHorizontalResolution'],
        'resY': data['Videocard']['CurrentVerticalResolution'],
    }
    for i, memory_bank in enumerate(data['Memory']):
        parsed_data[f'ram{i}_Capacity'] = memory_bank['Capacity']
        parsed_data[f'ram{i}_Configuredclockspeed'] = memory_bank['Configuredclockspeed']
    return parsed_data


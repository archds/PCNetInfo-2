from typing import Dict


def convert_gql_pc(gql_input: Dict) -> Dict:
    output = {
        'pc_name': gql_input.get('name'),
        'os_name': gql_input.get('os', {}).get('name'),
        'os_version': gql_input.get('os', {}).get('version'),
        'os_architecture': gql_input.get('os', {}).get('architecture'),
        'domain': gql_input.get('domain'),
        'ip': gql_input.get('ip'),
        'cpu_name': gql_input.get('cpu', {}).get('name'),
        'cpu_clock': gql_input.get('cpu', {}).get('clock'),
        'cpu_cores': gql_input.get('cpu', {}).get('cores'),
        'cpu_threads': gql_input.get('cpu', {}).get('threads'),
        'cpu_socket': gql_input.get('cpu', {}).get('socket'),
        'motherboard_manufacturer': gql_input.get('motherboard', {}).get('manufacturer'),
        'motherboard_product': gql_input.get('motherboard', {}).get('product'),
        'motherboard_serial': gql_input.get('motherboard', {}).get('serial'),
        'ram': gql_input.get('ram', {}).get('size'),
        'videocard': gql_input.get('videocard', {}).get('name'),
        'resX': gql_input.get('videocard', {}).get('resX'),
        'resY': gql_input.get('videocard', {}).get('resY'),
        'username': gql_input.get('username'),
        'timezone': gql_input.get('timezone'),
        'user': gql_input.get('user'),
        'serial_number': gql_input.get('serial'),
        'location': gql_input.get('location'),
        'updated': gql_input.get('updated'),
        'comment': gql_input.get('comment'),
        'label': gql_input.get('label'),
        'form_factor': gql_input.get('form_factor'),
        'hardware_type': gql_input.get('type'),
    }

    for i, bank in enumerate(gql_input.get('RAM', {}).get('banks', [])):
        output[f'ram{i}_Configuredclockspeed'] = bank.get('speed')
        output[f'ram{i}_Capacity'] = bank.get('capacity')

    return output

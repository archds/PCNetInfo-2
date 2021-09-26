from typing import Dict


def convert_gql_pc(gql_input: Dict) -> Dict:
    os = {
        'name': gql_input.get('os', {}).get('name'),
        'version': gql_input.get('os', {}).get('version'),
        'architecture': gql_input.get('os', {}).get('architecture'),
    }

    cpu = {
        'name': gql_input.get('cpu', {}).get('name'),
        'clock': gql_input.get('cpu', {}).get('clock'),
        'cores': gql_input.get('cpu', {}).get('cores'),
        'threads': gql_input.get('cpu', {}).get('threads'),
    }

    videocard = {
        'name': gql_input.get('videocard', {}).get('name'),
        'memory': gql_input.get('videocard', {}).get('memory'),
    }

    common = {
        'name': gql_input.get('name'),
        'domain': gql_input.get('domain'),
        'ip': gql_input.get('ip'),
        'ram': gql_input.get('ram'),
        'username': gql_input.get('username'),
        'user': gql_input.get('user'),
        'serial_number': gql_input.get('serial'),
        'location': gql_input.get('location'),
        'updated': gql_input.get('updated'),
        'comment': gql_input.get('comment'),
        'label': gql_input.get('label'),
        'form_factor': gql_input.get('formFactor', 'ATX'),
        'hardware_type': gql_input.get('type'),
    }

    output = {
        'common': dict(**common),
        'videocard': dict(**videocard) if all(value is not None for value in videocard.values()) else None,
        'os': dict(**os) if all(value is not None for value in os.values()) else None,
        'cpu': dict(**cpu) if all(value is not None for value in cpu.values()) else None,
    }

    return output

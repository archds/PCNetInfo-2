from typing import Dict


def convert_gql_pc(gql_input: Dict) -> Dict:
    os = {
        'os_name': gql_input.get('os', {}).get('name'),
        'os_architecture': gql_input.get('os', {}).get('architecture'),
    }

    cpu = {
        'cpu_name': gql_input.get('cpu', {}).get('name'),
        'cpu_clock': gql_input.get('cpu', {}).get('clock'),
        'cpu_cores': gql_input.get('cpu', {}).get('cores'),
        'cpu_threads': gql_input.get('cpu', {}).get('threads'),
    }

    videocard = {
        'videocard_name': gql_input.get('videocard', {}).get('name'),
        'videocard_memory': gql_input.get('videocard', {}).get('memory'),
    }

    common = {
        'name': gql_input.get('name'),
        'domain': gql_input.get('domain'),
        'ip': gql_input.get('ip'),
        'ram': gql_input.get('ram'),
        'username': gql_input.get('username'),
        # 'user': gql_input.get('user'),
        'serial_number': gql_input.get('serial'),
        'location': gql_input.get('location'),
        'updated': gql_input.get('updated'),
        'comment': gql_input.get('comment'),
        'label': gql_input.get('label'),
        'form_factor': gql_input.get('formFactor', 'ATX'),
        'hardware_type': gql_input.get('type'),
    }

    return common | videocard | os | cpu

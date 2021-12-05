from hardware.models import Computer


def gql_computer_convert(comp: Computer) -> dict:
    return {
        'id': comp.pk,
        'type': comp.hardware_type.upper(),
        'name': comp.name,
        'domain': comp.domain,
        'username': comp.username,
        'serial': comp.serial_number,
        'ip': comp.ip,
        'comment': comp.comment,
        'label': comp.label,
        'user': comp.user,
        'location': comp.location,
        'updated': comp.updated,
        'formFactor': comp.form_factor,
        'os': {
            'name': comp.os_name,
            'architecture': comp.os_architecture,
        },
        'cpu': {
            'name': comp.cpu_name,
            'clock': comp.cpu_clock,
            'cores': comp.cpu_cores,
            'threads': comp.cpu_threads,
        },
        'ram': comp.ram,
        'videocard': {
            'name': comp.videocard_name,
            'memory': comp.videocard_memory
        },
    }

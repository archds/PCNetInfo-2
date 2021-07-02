import gql_api.api as gqt
from hardware.models import PC


@gqt.ram.field('size')
def ram_size_resolver(pc_obj: PC, info):
    return pc_obj.ram and int(pc_obj.ram / 1048576)


@gqt.ram.field('banks')
def ram_banks_resolver(pc_obj: PC, info):
    bytes_in_gb = 1073741824
    return [
        {
            'speed': pc_obj.ram0_Configuredclockspeed,
            'capacity': pc_obj.ram0_Capacity and pc_obj.ram0_Capacity / bytes_in_gb
        },
        {
            'speed': pc_obj.ram1_Configuredclockspeed,
            'capacity': pc_obj.ram1_Capacity and pc_obj.ram1_Capacity / bytes_in_gb
        },
        {
            'speed': pc_obj.ram2_Configuredclockspeed,
            'capacity': pc_obj.ram2_Capacity and pc_obj.ram2_Capacity / bytes_in_gb
        },
        {
            'speed': pc_obj.ram3_Configuredclockspeed,
            'capacity': pc_obj.ram3_Capacity and pc_obj.ram3_Capacity / bytes_in_gb
        },
    ]

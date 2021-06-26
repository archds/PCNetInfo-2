from django.db.models import (
    CharField,
    GenericIPAddressField,
    SmallIntegerField,
    IntegerField,
    DateTimeField,
    TextField,
    ForeignKey,
)
from django.db.models import Model
from django.db.models import CASCADE


class Monitor(Model):
    serial_number = CharField(max_length=50, unique=True)
    model = CharField(max_length=100)
    user = CharField(max_length=100)



class PC(Model):
    hardware_type = CharField(max_length=50)
    os_name = CharField(max_length=50)
    os_version = CharField(max_length=50)
    os_architecture = CharField(max_length=50)
    pc_name = CharField(max_length=50, unique=True)
    domain = CharField(max_length=50)
    ip = GenericIPAddressField(null=True)
    cpu_name = CharField(max_length=100)
    cpu_clock = SmallIntegerField(null=True)
    cpu_cores = SmallIntegerField(null=True)
    cpu_threads = SmallIntegerField(null=True)
    cpu_socket = CharField(max_length=10)
    motherboard_manufacturer = CharField(max_length=50)
    motherboard_product = CharField(max_length=100)
    motherboard_serial = CharField(max_length=100)
    ram = IntegerField(null=True)
    ram0_Configuredclockspeed = IntegerField(null=True)
    ram0_Capacity = IntegerField(null=True)
    ram1_Configuredclockspeed = IntegerField(null=True)
    ram1_Capacity = IntegerField(null=True)
    ram2_Configuredclockspeed = IntegerField(null=True)
    ram2_Capacity = IntegerField(null=True)
    ram3_Configuredclockspeed = IntegerField(null=True)
    ram3_Capacity = IntegerField(null=True)
    videocard = CharField(max_length=100)
    resX = IntegerField(null=True)
    resY = IntegerField(null=True)
    username = CharField(max_length=100)
    timezone = CharField(max_length=100)
    user = CharField(max_length=200)
    serial_number = IntegerField(null=True)
    location = CharField(max_length=200)
    updated = DateTimeField(auto_now=True)
    comment = TextField()
    label = CharField(max_length=100)
    form_factor = CharField(max_length=20)
    monitor = ForeignKey(Monitor, on_delete=CASCADE, null=True)


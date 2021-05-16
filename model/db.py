from pathlib import Path
from peewee import (
    SqliteDatabase,
    Model,
    AutoField,
    CharField,
    IPField,
    SmallIntegerField,
    IntegerField,
    DateTimeField,
    TextField,
    ForeignKeyField
)

DATABASE_PATH = Path.cwd().joinpath('./database/test.db')
print(DATABASE_PATH)
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

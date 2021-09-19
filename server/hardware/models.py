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
from django.db.models import TextChoices, DO_NOTHING


class Monitor(Model):
    serial_number = CharField(max_length=50, unique=True)
    model = CharField(max_length=100)
    user = CharField(max_length=100)


class OS(Model):
    class Architecture(TextChoices):
        x64 = 'x64'
        x32 = 'x32'

    name = CharField(max_length=50)
    version = CharField(max_length=50, null=True)
    architecture = CharField(choices=Architecture.choices, max_length=50)

    class Meta:
        unique_together = ('name', 'architecture', 'version')


class CPU(Model):
    name = CharField(max_length=100, unique=True)
    clock = SmallIntegerField()
    cores = SmallIntegerField()
    threads = SmallIntegerField()
    # socket = CharField(max_length=20)


class Videocard(Model):
    name = CharField(max_length=100, unique=True)
    memory = SmallIntegerField()


class PC(Model):
    class HwType(TextChoices):
        DESKTOP = 'DESKTOP'
        LAPTOP = 'LAPTOP'

    class FormFactor(TextChoices):
        ATX = 'ATX'
        mATX = 'mATX'

    hardware_type = CharField(choices=HwType.choices, default=HwType.DESKTOP, max_length=50)
    os = ForeignKey(to=OS, on_delete=DO_NOTHING, null=True)
    cpu = ForeignKey(to=CPU, on_delete=DO_NOTHING, null=True)
    videocard = ForeignKey(to=Videocard, on_delete=DO_NOTHING, null=True)
    ram = IntegerField(null=True)
    pc_name = CharField(max_length=50, unique=True)
    domain = CharField(max_length=50, null=True)
    ip = GenericIPAddressField(null=True)
    username = CharField(max_length=100, null=True)
    user = CharField(max_length=200, null=True)
    serial_number = IntegerField(null=True)
    location = CharField(max_length=200, null=True)
    updated = DateTimeField(auto_now=True)
    comment = TextField(null=True)
    label = CharField(max_length=100, null=True)
    form_factor = CharField(choices=FormFactor.choices, default=FormFactor.ATX, max_length=20)

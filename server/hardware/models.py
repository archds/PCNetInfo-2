from django.db.models import (
    CharField,
    GenericIPAddressField,
    SmallIntegerField,
    IntegerField,
    DateTimeField,
    TextField,
    ForeignKey, CASCADE, OneToOneField,
)
from django.db.models import Model
from django.db.models import TextChoices, DO_NOTHING, SET_NULL


# ToDo: location refactor
class Monitor(Model):
    serial_number = CharField(max_length=50, unique=True)
    model = CharField(max_length=100)
    user = CharField(max_length=100)


class OS(Model):
    class Architecture(TextChoices):
        x64 = 'x64'
        x32 = 'x32'

    name = CharField(max_length=50)
    # version = CharField(max_length=50, null=True)
    architecture = CharField(choices=Architecture.choices, max_length=50)

    class Meta:
        unique_together = ('name', 'architecture')


class CPU(Model):
    name = CharField(max_length=100, unique=True)
    clock = SmallIntegerField()
    cores = SmallIntegerField()
    threads = SmallIntegerField()
    # socket = CharField(max_length=20)


class Videocard(Model):
    name = CharField(max_length=100, unique=True)
    memory = SmallIntegerField()


class UserRole(Model):
    title = CharField(max_length=100, unique=True)
    priority = SmallIntegerField(null=True)


class Building(Model):
    street = CharField(max_length=100)
    house = CharField(max_length=50)


class Location(Model):
    building = ForeignKey(Building, related_name='locations', on_delete=CASCADE)
    cabinet = CharField(max_length=50)
    floor = SmallIntegerField()
    description = TextField()


class User(Model):
    first_name = CharField(max_length=100)
    last_name = CharField(max_length=100)
    role = ForeignKey(UserRole, null=True, related_name='users', on_delete=SET_NULL)
    location = ForeignKey(Location, null=True, related_name='employees', on_delete=SET_NULL)


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
    name = CharField(max_length=50, unique=True)
    domain = CharField(max_length=50, null=True)
    ip = GenericIPAddressField(null=True)
    username = CharField(max_length=100, null=True)
    user = OneToOneField(User, null=True, on_delete=SET_NULL, related_name='computer')
    serial_number = CharField(null=True, max_length=50, unique=True)
    location = ForeignKey(Location, related_name='computers', on_delete=SET_NULL, null=True)
    updated = DateTimeField(auto_now=True)
    comment = TextField(null=True)
    label = CharField(max_length=100, null=True)
    form_factor = CharField(choices=FormFactor.choices, default=FormFactor.ATX, max_length=20)

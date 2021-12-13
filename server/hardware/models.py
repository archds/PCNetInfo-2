from django.db import models


class Monitor(models.Model):
    serial_number = models.CharField(max_length=50, unique=True)
    model = models.CharField(max_length=100)
    user = models.CharField(max_length=100)


class UserRole(models.Model):
    title = models.CharField(max_length=100, unique=True)
    priority = models.SmallIntegerField(null=True)

    def __str__(self):
        return self.title


class Building(models.Model):
    street = models.CharField(max_length=100)
    house = models.CharField(max_length=50)

    class Meta:
        unique_together = ['street', 'house']


class Location(models.Model):
    building = models.ForeignKey(Building, related_name='locations', on_delete=models.CASCADE)
    cabinet = models.CharField(max_length=50)
    floor = models.SmallIntegerField(null=True)
    description = models.TextField(null=True)

    class Meta:
        unique_together = ['building', 'cabinet']


class ComputerUser(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    roles = models.ManyToManyField(UserRole)


class Computer(models.Model):
    class Architecture(models.TextChoices):
        x64 = 'x64'
        x32 = 'x32'

    class HwType(models.TextChoices):
        DESKTOP = 'DESKTOP'
        LAPTOP = 'LAPTOP'

    class FormFactor(models.TextChoices):
        ATX = 'ATX'
        mATX = 'mATX'

    hardware_type = models.CharField(choices=HwType.choices, default=HwType.DESKTOP, max_length=50)

    # OS
    os_name = models.CharField(max_length=50, null=True)
    os_architecture = models.CharField(max_length=50, choices=Architecture.choices, null=True)

    # CPU
    cpu_name = models.CharField(max_length=100, null=True)
    cpu_clock = models.SmallIntegerField(null=True)
    cpu_cores = models.SmallIntegerField(null=True)
    cpu_threads = models.SmallIntegerField(null=True)

    # Videocard
    videocard_name = models.CharField(max_length=100, null=True)
    videocard_memory = models.SmallIntegerField(null=True)

    # RAM
    ram = models.FloatField(null=True)

    # Common
    name = models.CharField(max_length=50, unique=True)
    domain = models.CharField(max_length=50, null=True)
    ip = models.GenericIPAddressField(null=True)
    username = models.CharField(max_length=100, null=True)
    users = models.ManyToManyField(ComputerUser, related_name='computers')
    serial_number = models.CharField(null=True, max_length=50, unique=True)
    location = models.ForeignKey(Location, related_name='computers', on_delete=models.SET_NULL, null=True)
    updated = models.DateTimeField(auto_now=True)
    comment = models.TextField(null=True)
    label = models.CharField(max_length=100, null=True)
    form_factor = models.CharField(choices=FormFactor.choices, default=FormFactor.ATX, max_length=20)

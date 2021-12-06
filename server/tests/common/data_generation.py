import random as rnd
import uuid

from django.contrib.auth.models import User

from hardware.models import Computer


def create_test_computers(amount: int, seed: str = 'create_test_computers') -> list[Computer]:
    if seed is not None:
        rnd.seed(seed)

    cores = rnd.randint(1, 16)

    return Computer.objects.bulk_create(
        [
            Computer(
                hardware_type=rnd.choice(list(Computer.HwType)),
                os_name='Windows 10',
                os_architecture=rnd.choice(list(Computer.Architecture)),
                cpu_name=rnd.choice(['Windows 11', 'Windows 10', 'Windows 7']),
                cpu_clock=rnd.randint(1000, 5000),
                cpu_cores=cores,
                cpu_threads=cores * 2,
                videocard_name='NVIDIA GeForce GTX 770',
                videocard_memory=rnd.randint(1, 4),
                ram=rnd.randint(2, 32),
                name=f'PC-{str(uuid.uuid4()).replace("-", "")}',
                form_factor=rnd.choice(list(Computer.FormFactor))
            )
            for _ in range(amount)
        ]
    )


def create_test_user(username: str, password: str) -> User:
    return User.objects.create_user(
        username=username,
        password=password,
        email='test@example.com',
        is_active=True
    )

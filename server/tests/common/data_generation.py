import itertools
import json
import random as rnd
import uuid

from django.contrib.auth.models import User

from dj_service.settings import TESTS_DIR
from gql.resolvers.auth import create_jwt
from hardware.models import Computer, ComputerUser, UserRole


def create_test_computers(
        amount: int,
        seed: str = 'create_test_computers',
        users: list[ComputerUser] = None
) -> list[Computer]:
    if seed is not None:
        rnd.seed(seed)

    cores = rnd.randint(1, 16)

    comps = Computer.objects.bulk_create(
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
                name=f'PC-TEST-{uuid.uuid4()}',
                form_factor=rnd.choice(list(Computer.FormFactor))
            )
            for _ in range(amount)
        ]
    )

    if users:
        for comp, user in zip(Computer.objects.filter(name__in=[comp.name for comp in comps]), users):
            comp.users.add(user)
            comp.save()

    return comps


def create_test_user(username: str, password: str) -> tuple[User, str]:
    user = User.objects.create_user(
        username=username,
        password=password,
        email='test@example.com',
        is_active=True
    )
    token = create_jwt(user)

    return user, token


def create_test_computer_users(
        amount: int,
        with_roles: bool = False,
        seed: str = 'computer users test seed',
        computers_per_user: int = 0,
) -> list[ComputerUser]:
    if seed is not None:
        rnd.seed(seed)

    with open(TESTS_DIR / 'fixtures' / 'users.json') as user_fixture:
        users = []
        for json_user in json.load(user_fixture)[:amount]:
            user = ComputerUser.objects.create(
                first_name=json_user['firstname'],
                last_name=json_user['lastname']
            )

            if with_roles:
                role = UserRole.objects.get_or_create(
                    title=json_user['role'],
                    defaults={'priority': rnd.randint(1, 10)}
                )[0]
                user.roles.add(role)

            if computers_per_user:
                create_test_computers(
                    amount=computers_per_user,
                    seed=f'test computer for {user.first_name}',
                    users=list(itertools.repeat(user, computers_per_user))
                )

            users.append(user)

    return users

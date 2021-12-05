import logging
import os
from collections import namedtuple

from django.contrib.auth.models import User
from django.core.management import BaseCommand

logger = logging.getLogger(__name__)

credentials = namedtuple('Credentials', 'username email password')


class Command(BaseCommand):
    help = 'Creates default superuser'

    def handle(self, *args, **options):
        logger.info('Creating superuser...')
        cred = credentials(
            username=os.getenv('SU_NAME'),
            email=None,
            password=os.getenv('SU_PASS')
        )

        if User.objects.filter(username=cred.username).exists():
            logger.info(f'User "{cred.username}" already exists')
        else:
            User.objects.create_superuser(*cred)
            logger.info('Superuser created')

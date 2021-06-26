import os
import django
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dj_service.settings')
django.setup()
import hardware.models as hw

from django.test import TestCase
from hardware.models import PC


class HardwareTests(TestCase):
    def test_query(self):
        with open('database/test.json') as test_data:
            test_data = json.loads(test_data.read())
            test_data.pop('pc_id')
            test_pc = PC(test_data[0])
            test_pc.save()


if __name__ == '__main__':
    HardwareTests.test_query()
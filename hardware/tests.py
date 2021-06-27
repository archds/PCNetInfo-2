import os
import django
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dj_service.settings')
django.setup()
import hardware.models as hw

from django.test import TestCase
from hardware.models import PC
from hardware.views import *


class HardwareTests(TestCase):
    def test_query(self):
        pass


class HardwareViewsTests(TestCase):
    def test_sort(self):
        pass


if __name__ == '__main__':
    HardwareTests.mai
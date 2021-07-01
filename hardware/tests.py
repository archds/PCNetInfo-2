import os

import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dj_service.settings')
django.setup()

from django.test import TestCase


class HardwareTests(TestCase):
    def test_query(self):
        pass


class HardwareViewsTests(TestCase):
    def test_sort(self):
        pass


if __name__ == '__main__':
    HardwareTests.mai
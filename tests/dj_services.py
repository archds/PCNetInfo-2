import os
import json
import unittest
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dj_service.settings')
django.setup()
from hardware.models import PC
from django.forms.models import model_to_dict


class HardwareTests(unittest.TestCase):
    def test_query(self):
        with open('database/test.json', encoding='UTF-8') as test_data:
            test_data = json.loads(test_data.read())
            [pc.pop('pc_id') for pc in test_data]
            q = PC.objects.get(pk=1)
            print(model_to_dict(q))


if __name__ == '__main__':
    unittest.main()
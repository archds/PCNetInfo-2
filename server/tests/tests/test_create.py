from django.conf import settings
from django.test import TestCase

from tests.common.requests import post_msinfo


def _get_msinfo_fixture() -> bytes:
    path = settings.BASE_DIR / 'tests' / 'fixtures' / 'msinfo' / '97c3b6f1-d910-45ce-92ce-4a93ef22992c.nfo'
    return open(path, 'rb').read()


class HardwareCreationTest(TestCase):
    def test_msinfo_creation(self):
        # Arrange
        # Act
        response = post_msinfo(msinfo=_get_msinfo_fixture())

        # Assert
        self.assertEqual(response.status_code, 200)

from django.conf import settings
from django.test import TestCase
from parameterized import parameterized

from hardware.domain import Locale
from hardware.models import Computer
from tests.common.requests import post_msinfo

DEFAULT_FIXTURE_PC_NAME = 'FIXTURE-PC'


def _get_msinfo_fixture(locale: Locale) -> bytes:
    suffix = {
        locale.eng: 'en',
        locale.rus: 'ru'
    }[locale]
    path = settings.BASE_DIR / 'tests' / 'fixtures' / 'msinfo' / f'msinfo_fixture_{suffix}.nfo'
    return open(path, 'rb').read()


class MSInfoProcessingTest(TestCase):
    @parameterized.expand(
        [
            [Locale.eng],
            [Locale.rus]
        ]
    )
    def test_msinfo_processing(self, locale):
        # Arrange
        fixture = _get_msinfo_fixture(locale)
        # Act
        response = post_msinfo(fixture, locale)

        # Assert
        self.assertEqual(response.status_code, 200)
        self.assertTrue(Computer.objects.filter(name=DEFAULT_FIXTURE_PC_NAME).exists())

from django.test import TestCase

from hardware.models import Computer
from tests.common.data_generation import create_test_computers
from tests.graphql.queries import send_computer_query, send_computers_query


class ComputerQueryTests(TestCase):
    def test_computers_query(self):
        # Arrange
        amount = 5
        create_test_computers(amount)

        # Act
        response = send_computers_query()

        # Assert
        self.assertNotIn('errors', response)
        self.assertEqual(len(response['data']['computers']), amount)

    def test_computer_query(self):
        # Arrange
        [computer] = create_test_computers(1)

        # Act
        response = send_computer_query(Computer.objects.get(name=computer.name).pk)

        # Assert
        self.assertNotIn('errors', response)
        self.assertEqual(response['data']['computer']['name'], computer.name)

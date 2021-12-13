from django.test import TestCase

from hardware.models import Computer
from tests.common.data_generation import create_test_computers, create_test_user
from tests.graphql.mutations import (
    send_create_computer_mutation,
    send_delete_computer_mutation,
    send_update_computer_mutation
)
from tests.graphql.queries import send_computer_query, send_computers_query


class ComputerQueryTests(TestCase):
    @classmethod
    def setUpClass(cls):
        username = 'com_test_user'
        password = 'test_pass'
        cls.user, cls.token = create_test_user(username, password)
        super(ComputerQueryTests, cls).setUpClass()

    def test_computers_query(self):
        # Arrange
        amount = 5
        create_test_computers(amount)

        # Act
        response = send_computers_query(token=self.token)

        # Assert
        self.assertNotIn('errors', response)
        self.assertEqual(len(response['data']['computers']), amount)

    def test_computer_query(self):
        # Arrange
        [computer] = create_test_computers(1)

        # Act
        response = send_computer_query(Computer.objects.get(name=computer.name).pk, self.token)

        # Assert
        self.assertNotIn('errors', response)
        self.assertEqual(response['data']['computer']['name'], computer.name)

    def test_create_computer_mutation(self):
        # Arrange
        data = {
            'name': 'PC-TEST',
            'label': 'Test label 123',
            'type': 'DESKTOP',
            'serial': '3321',
            # 'location': '502 каб',
            'os': {
                'name': 'Windows 10',
                'architecture': 'x64',
            },
            'cpu': {
                'name': 'Intel Core i3-10100F',
                'clock': 3300,
                'cores': 4,
                'threads': 4,
            },
            'ram': 8,
        }

        # Act
        response = send_create_computer_mutation(data, self.token)

        # Assert
        self.assertNotIn('errors', response)
        self.assertTrue(Computer.objects.filter(name=data['name']).exists())

    def test_delete_computer_mutation(self):
        # Arrange
        [computer] = create_test_computers(1)

        # Act
        response = send_delete_computer_mutation(Computer.objects.get(name=computer.name).pk, self.token)

        # Assert
        self.assertNotIn('errors', response)
        self.assertFalse(Computer.objects.filter(name=computer.name).exists())

    def test_update_computer_mutation(self):
        # Arrange
        [computer] = create_test_computers(1)
        data = {
            'name': 'My custom name',
            'serial': '6605'
        }

        # Act
        response = send_update_computer_mutation(
            computer_id=Computer.objects.get(name=computer.name).pk,
            data=data,
            token=self.token
        )

        # Assert
        self.assertNotIn('errors', response)

    def test_computer_search_query(self):
        # Arrange
        create_test_computers(10)
        computer = Computer.objects.first()
        computer.label = 'test label'
        computer.save()

        # Act
        response = send_computers_query(token=self.token, search_string=computer.label)

        # Assert
        self.assertNotIn('errors', response)
        self.assertEqual(1, len(response['data']['computers']))
        self.assertEqual(computer.label, response['data']['computers'][0]['label'])

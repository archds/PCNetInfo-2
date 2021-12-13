from django.test import TestCase

from hardware.models import ComputerUser, UserRole
from tests.common.data_generation import create_test_computer_users, create_test_user
from tests.graphql.mutations import (
    send_create_user_mutation,
    send_create_user_role_mutation,
    send_delete_user_mutation, send_delete_user_role_mutation, send_update_user_mutation
)
from tests.graphql.queries import send_user_roles_query, send_users_query


class UserTests(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.user, cls.token = create_test_user('users_test_user', 'test_pass')
        super(UserTests, cls).setUpClass()

    def test_users_query(self):
        # Arrange
        amount = 10
        create_test_computer_users(amount, with_roles=True, computers_per_user=2)

        # Act
        response = send_users_query(token=self.token)

        # Assert
        self.assertNotIn('errors', response)
        self.assertEqual(amount, len(response['data']['users']))

    def test_user_roles_query(self):
        # Arrange
        create_test_computer_users(5, with_roles=True)

        # Act
        response = send_user_roles_query(self.token)

        # Assert
        self.assertNotIn('errors', response)
        self.assertTrue(len(response['data']['userRoles']))

    def test_create_user_role_mutation(self):
        # Act
        response = send_create_user_role_mutation(token=self.token, title='Test user role', priority=1)

        # Assert
        self.assertNotIn('errors', response)
        self.assertTrue(UserRole.objects.filter(title='Test user role').exists())

    def test_delete_user_role_mutation(self):
        # Arrange
        send_create_user_role_mutation(token=self.token, title='Test user role', priority=1)
        [role] = send_user_roles_query(self.token)['data']['userRoles']

        # Act
        response = send_delete_user_role_mutation(token=self.token, role_id=role['id'])

        # Assert
        self.assertNotIn('errors', response)
        self.assertFalse(UserRole.objects.filter(title='Test user role').exists())

    def test_create_user_mutation(self):
        # Arrange
        roles = ['interest', 'behave', 'tube', 'discuss', 'succeed', 'rapid', 'move', 'afford', 'reach', 'holy']
        send_create_user_role_mutation(token=self.token, title=roles[0])
        send_create_user_role_mutation(token=self.token, title=roles[1])

        # Act
        response = send_create_user_mutation(
            token=self.token,
            first_name='brave',
            last_name='robbery',
            roles=roles
        )

        # Assert
        self.assertNotIn('errors', response)
        self.assertTrue(ComputerUser.objects.filter(first_name='brave').exists())
        self.assertEqual(roles, [role.title for role in ComputerUser.objects.get(first_name='brave').roles.all()])

    def test_update_user_mutation(self):
        # Arrange
        send_create_user_mutation(
            token=self.token,
            first_name='brave',
            last_name='robbery',
            roles=['send', 'look']
        )

        [computer_user] = send_users_query(token=self.token)['data']['users']

        # Act
        response = send_update_user_mutation(
            token=self.token,
            user_id=computer_user['id'],
            first_name='station',
            last_name='robbery',
            roles=[role['title'] for role in computer_user['roles']] + ['skin']
        )

        # Assert
        self.assertNotIn('errors', response)
        self.assertEqual(ComputerUser.objects.get(pk=computer_user['id']).first_name, 'station')
        self.assertEqual(
            [role['title'] for role in computer_user['roles']] + ['skin'],
            [role.title for role in ComputerUser.objects.get(pk=computer_user['id']).roles.all()]
        )

    def test_delete_user_mutation(self):
        # Arrange
        send_create_user_mutation(
            token=self.token,
            first_name='opposite',
            last_name='anxiety',
            roles=['choose', 'flow']
        )
        [computer_user] = send_users_query(token=self.token)['data']['users']

        # Act
        response = send_delete_user_mutation(token=self.token, user_id=computer_user['id'])

        # Assert
        self.assertNotIn('errors', response)
        self.assertFalse(ComputerUser.objects.filter(pk=computer_user['id']).exists())

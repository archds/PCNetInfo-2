from django.test import TestCase

from tests.common.data_generation import create_test_computer_users, create_test_user
from tests.graphql.queries import send_users_query


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

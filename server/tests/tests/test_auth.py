import jwt
from django.conf import settings
from django.test import TestCase

from tests.common.data_generation import create_test_user
from tests.graphql.mutations import send_auth_mutation, send_verify_token_mutation


class ComputerQueryTests(TestCase):
    def test_token_auth(self):
        # Act
        create_test_user('test_user', 'test_pass')
        response = send_auth_mutation('test_user', 'test_pass')

        # Assert
        self.assertNotIn('errors', response)
        jwt.decode(
            jwt=response['data']['auth']['token'],
            key=settings.SECRET_KEY,
            algorithms=["HS256"],
        )

    def test_token_verify(self):
        # Act
        create_test_user('test_user', 'test_pass')
        token = send_auth_mutation('test_user', 'test_pass')['data']['auth']['token']
        response = send_verify_token_mutation(token)

        # Assert
        self.assertNotIn('errors', response)

import re
from typing import Optional

import jwt
from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.models import AnonymousUser, User
from django.http import HttpRequest
from jwt import DecodeError, InvalidTokenError

from gql import type_defs as gqt
from gql.errors import AuthenticatedUserRequiredError, AuthenticationFailed, GQLError

HTTP_AUTHORIZATION_HEADER = f"HTTP_{settings.AUTH_TOKEN_HEADER.upper().replace('-', '_')}"
AUTHORIZATION_HEADER_PREFIX = "Token"


def create_jwt(user, extra_payload=None):
    """Creates a JWT for an authenticated user"""
    if not user.is_authenticated:
        raise AuthenticatedUserRequiredError("JWT generation requires an authenticated user")

    payload = {
        'user': user.username,
        **(extra_payload or dict())
    }

    return jwt.encode(payload=payload, key=settings.SECRET_KEY)


def decode_jwt(token, verify_expiration=True):
    """Decodes a JWT"""
    try:
        decoded = jwt.decode(
            jwt=token,
            key=settings.SECRET_KEY,
            algorithms=["HS256"],
        )

    except DecodeError:
        raise InvalidTokenError()

    return decoded


def get_user_from_request(request: HttpRequest) -> Optional[User]:
    if not isinstance(request, HttpRequest):
        raise GQLError(f'Expexted an HttpRequest context, got {type(request)}')

    user = getattr(request, 'user')
    if user and not isinstance(user, AnonymousUser):
        return user


def get_token_from_http_header(request):
    """Retrieves the http authorization header from the request"""
    if not (header := request.META.get(HTTP_AUTHORIZATION_HEADER)):
        return None

    if not (token_match := re.match(
            fr'^{AUTHORIZATION_HEADER_PREFIX} ([A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*)$',
            header,
    )):
        return None

    token = token_match.group(1)

    return token


@gqt.mutation.field('auth')
def resolve_token_auth(_obj, info, **credentials):
    """Resolves the token auth mutation"""
    user = authenticate(info.context, **credentials)
    if not user:
        raise AuthenticationFailed

    token = create_jwt(user)

    return {"token": token}


@gqt.mutation.field('verifyToken')
def resolve_verify_token(_obj, _info, token: str):
    """Resolves the verify token mutation"""

    decode_jwt(token)

    return gqt.Unit

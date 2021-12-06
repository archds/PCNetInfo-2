import re
from datetime import datetime, timedelta

import jwt
from django.conf import settings
from django.contrib.auth import authenticate

from gql import type_defs as gqt
from gql.errors import AuthenticatedUserRequiredError, AuthenticationError

HTTP_AUTHORIZATION_HEADER = f"HTTP_{settings.AUTH_TOKEN_HEADER.upper().replace('-', '_')}"
AUTHORIZATION_HEADER_PREFIX = "Token"

TOKEN_EXP_DELTA = timedelta(days=3)


def create_jwt(user, extra_payload=None):
    """Creates a JWT for an authenticated user"""
    if not user.is_authenticated:
        raise AuthenticatedUserRequiredError("JWT generation requires an authenticated user")

    payload = {
        'user': user.username,
        'exp': datetime.now() + TOKEN_EXP_DELTA,
        **(extra_payload or dict())
    }

    return jwt.encode(payload=payload, key=settings.SECRET_KEY)


def decode_jwt(token, verify_expiration=True):
    """Decodes a JWT"""
    decoded = jwt.decode(
        jwt=token,
        key=settings.SECRET_KEY,
        algorithms=["HS256"],
    )

    return decoded


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


def login_required(resolver):
    def wrapper(parent, info, *args, **kwargs):
        token = get_token_from_http_header(info.context.get('request'))
        try:
            decode_jwt(token)
        except jwt.InvalidTokenError:
            raise AuthenticationError
        return resolver(parent, info, *args, **kwargs)

    return wrapper


@gqt.query.field('auth')
def resolve_token_auth(_obj, info, **credentials):
    """Resolves the token auth mutation"""
    user = authenticate(info.context, **credentials)
    if not user:
        return {'valid': False}

    token = create_jwt(user)

    return {
        'valid': True,
        'token': token
    }


@gqt.query.field('verifyToken')
def resolve_verify_token(_obj, _info, token: str):
    """Resolves the verify token mutation"""
    result = {'valid': False}

    try:
        decode_jwt(token)
        result['valid'] = True
    except jwt.ExpiredSignatureError as err:
        result['message'] = 'Expired token'
    except jwt.InvalidTokenError:
        result['message'] = 'Invalid token'

    return result

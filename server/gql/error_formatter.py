from graphql import GraphQLError
from jwt import InvalidTokenError


def format_error(error: GraphQLError, debug: bool = False):
    formatted = error.formatted

    if readable := getattr(error.original_error, 'readable', None):
        message = readable
        formatted['__typename'] = 'ReadableError'
    elif input_field := getattr(error.original_error, 'field', None):
        formatted['__typename'] = 'InputError'
        formatted['field'] = input_field
    elif isinstance(error.original_error, InvalidTokenError):
        formatted['__typename'] = 'InvalidTokenError'
        message = error.message
    else:
        formatted['__typename'] = 'UnexpectedError'
        message = error.message

    formatted['message'] = message

    return formatted

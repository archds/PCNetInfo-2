from graphql import GraphQLError


def format_error(error: GraphQLError, debug: bool = False):
    formatted = error.formatted

    if readable := getattr(error.original_error, 'readable', None):
        message = readable
        formatted['__typename'] = 'ReadableError'
    if input_field := getattr(error.original_error, 'field', None):
        formatted['__typename'] = 'InputError'
        formatted['field'] = input_field
    else:
        message = "An unknown error occurred."

    formatted['message'] = message

    return formatted
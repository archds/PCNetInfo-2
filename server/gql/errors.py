class GQLError(Exception):
    pass


class ReadableError(GQLError):
    def __init__(
            self,
            message: str = None,
            readable: str = None,
    ):
        super(ReadableError, self).__init__(message)
        self.readable = readable or message


class InputError(ReadableError):
    def __init__(self, message: str = None, readable: str = None, field: str = None):
        super(InputError, self).__init__(message, readable)
        self.field = field

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

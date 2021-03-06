from collections import Callable
from logging import getLogger

from django.http import HttpRequest, HttpResponse, HttpResponseBadRequest, HttpResponseServerError
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from dj_service.settings import BASE_DIR
from hardware.domain import Locale, ProcessingResult
from hardware.processor import MSInfoProcessor

logger = getLogger(__file__)


def _get_console_response() -> str:
    with open(BASE_DIR / 'consoleResponse.txt') as file:
        return file.read()


def _generate_response(result: ProcessingResult) -> HttpResponse:
    if result.name is None:
        return HttpResponse('Can\'t parse even computer name, unable to create database record!')

    if not result.unparsed:
        additional = 'All information collected successfully. Have a good day!'
    else:
        additional = 'Unable to collect information about: ' + ', '.join(result.unparsed)

    main = f'New computer added - {result.name}' if result.is_created else f'Updated - {result.name}'

    return HttpResponse(f'{main}\n{additional}')


def error_intercept(func: Callable) -> Callable:
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as err:  # noqa
            logger.exception(err)
            return HttpResponseServerError(err)

    return wrapper


# TODO: Parse drives
# TODO: Parse domain
# TODO: Parse ip
@require_POST
@csrf_exempt
@error_intercept
def collect_msinfo(request: HttpRequest):
    if 'Locale' not in request.headers:
        logger.error('Locale not found in request headers!')
        return HttpResponseBadRequest('Locale not found in request headers!')

    locale = Locale(request.headers['Locale'])

    processing_result = MSInfoProcessor(locale).process(request.read())

    return _generate_response(processing_result)

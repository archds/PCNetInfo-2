from django.http import HttpRequest, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from dj_service.settings import BASE_DIR
from hardware.domain import Locale
from hardware.processor import MSInfoProcessor


def _get_console_response() -> str:
    with open(BASE_DIR / 'consoleResponse.txt') as file:
        return file.read()


def _generate_response() -> str:
    pass


# TODO: Parse drives
# TODO: Parse domain
# TODO: Parse ip
@require_POST
@csrf_exempt
def collect_msinfo(request: HttpRequest):
    locale = Locale(request.headers['Locale'])

    pc, is_pc_created = MSInfoProcessor(locale).process(request.read())

    response_str = f'New computer added in database - {pc.name}' if is_pc_created else f'{pc.name} updated'

    return HttpResponse(response_str)

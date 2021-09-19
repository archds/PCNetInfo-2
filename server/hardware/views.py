from io import BytesIO
from xml.etree.ElementTree import parse

from django.http import HttpRequest, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST


@require_POST
@csrf_exempt
def collect_msinfo(request: HttpRequest):
    raw = BytesIO(request.body)
    tree = parse(raw)
    root = tree.getroot()
    for element in root.iter('Data'):
        if element[0].tag == 'Item':
            print({element[0].text: element[1].text})
    # print(request.FILES)
    return HttpResponse(status=201)

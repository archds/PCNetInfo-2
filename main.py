import os
import json
import uvicorn
import django
import view.parser as parser

from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from ariadne.asgi import GraphQL

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dj_service.settings')
django.setup()

from api import schema, filters
from hardware.views import pc_single_context, pc_main_context, add_pc
from view.context import get_context

app = FastAPI()
app.mount('/static', StaticFiles(directory='static'), name='static')
app.mount("/api", GraphQL(schema, debug=True))
templates = Jinja2Templates(directory='templates')


@app.get("/")
async def root(request: Request):
    pcs = await pc_main_context()
    for pc in pcs:
        pc['href'] = app.url_path_for('get_pc', pc_name=pc['name'])
    context = get_context(app, request, items=pcs, filters=filters)
    if len(context['items']):
        return templates.TemplateResponse('pc_list.html', context)
    else:
        return templates.TemplateResponse('no_pcs.html', context)


@app.get('/pc/{pc_name}')
async def get_pc(pc_name: str, request: Request):
    context = get_context(app, request, pc=await pc_single_context(pc_name))
    return templates.TemplateResponse('pc_view.html', context)


@app.get('/files/{file_name}')
async def get_file(file_name: str):
    return FileResponse(f'filehost/{file_name}')


@app.post('/pc')
async def post_pc(request: Request):
    body = json.loads(await request.body())
    ip = request.client[0]
    pc = parser.powershell(body, ip)
    return await add_pc(pc)


if __name__ == '__main__':
    uvicorn.run('main:app', reload=True)

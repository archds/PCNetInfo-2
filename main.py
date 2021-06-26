from pprint import pprint

import uvicorn
import re
import json
import django
import asyncio
import view.db as db
import view.parser as parser
import view.search
from view.context import get_context
from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from api import schema, filters
from ariadne.asgi import GraphQL
import os

app = FastAPI()
app.mount('/static', StaticFiles(directory='static'), name='static')
app.mount("/api", GraphQL(schema, debug=True))
templates = Jinja2Templates(directory='templates')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dj_service.settings')
django.setup()
from hardware.views import *


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
    pprint(context)
    return templates.TemplateResponse('pc_view.html', context)


@app.get('/files/{file_name}')
async def get_file(file_name: str):
    return FileResponse(f'filehost/{file_name}')


@app.put('/pc/{pc_name}')
async def update_field(pc_name: str, request: Request):
    body = json.loads(await request.body())
    if re.match(r'ram\d_Capacity', body['field']):
        body['value'] = body['value'] if body['value'] else 0
        body['value'] = int(body['value']) * 1024 * 1024 * 1024
    db.update_pc_field(body['field'], body['value'], pc_name)


@app.post('/pc')
async def post_pc(request: Request):
    body = json.loads(await request.body())
    ip = request.client[0]
    pc = parser.powershell(body, ip)
    return await add_pc(pc)



@app.delete('/pc/{pc_name}')
async def delete_pc(pc_name: str):
    db.delete_pc(pc_name)


@app.get('/search/pc')
async def search():
    return view.search.get()


if __name__ == '__main__':
    uvicorn.run(app)

import uvicorn
import db
import json
from models import PowerShellParse
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()
app.mount('/static', StaticFiles(directory='static'), name='static')
app.mount('/dist', StaticFiles(directory='dist'), name='dist')
templates = Jinja2Templates(directory='templates')
db.conn.connect()
db.conn.create_tables([db.PC, db.Monitor])

context = {}


@app.get("/")
async def root(request: Request):
    pcs = db.getAll()
    for pc in pcs:
        pc['href'] = app.url_path_for('get_pc', pc_name=pc['name'])
    context['request'] = request
    context['nav'] = [{'caption': 'Computers', 'href': app.url_path_for('root')}]
    context['items'] = pcs
    if len(context['items']):
        return templates.TemplateResponse('pc_list.html', context)
    else:
        return templates.TemplateResponse('no_pcs.html', context)


@app.get('/pc/{pc_name}')
async def get_pc(pc_name: str, request: Request):
    context['request'] = request
    context['nav'] = [{'caption': 'Computers', 'href': app.url_path_for('root')}]
    context['pc'] = db.get(pc_name)
    return templates.TemplateResponse('pc_view.html', context)


@app.get('/files/{file_name}')
async def get_file(file_name: str):
    return FileResponse(f'filehost/{file_name}')


@app.put('/pc/{pc_name}')
async def update_field(pc_name: str, request: Request):
    body = json.loads(await request.body())
    print(body)
    db.update_pc_field(body['field'], body['value'], pc_name)


@app.post('/pc')
async def post_pc(request: Request):
    body = json.loads(await request.body())
    ip = request.client[0]
    pc = PowerShellParse(body, ip)
    return pc.post()

@app.delete('/pc/{pc_name}')
async def delete_pc(pc_name: str):
    db.delete_pc(pc_name)


if __name__ == '__main__':
    uvicorn.run(app)

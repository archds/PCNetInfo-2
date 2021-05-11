import uvicorn
import db
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()
app.mount('/static', StaticFiles(directory='static'), name='static')
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
        print(context['items'])
        return templates.TemplateResponse('pc_list.html', context)
    else:
        return templates.TemplateResponse('no_pcs.html', context)


@app.get('/pc')
async def pcMainHandler():
    return db.getAll()


@app.get('/pc/{pc_name}')
async def get_pc(pc_name: str):
    return db.get(pc_name)

@app.get('/files/{file_name}')
async def get_file(file_name: str):
    return FileResponse(f'filehost/{file_name}')


if __name__ == '__main__':
    uvicorn.run(app)

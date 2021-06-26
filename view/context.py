def get_nav(app):
    return [
        {'caption': 'Computers', 'href': app.url_path_for('root')}
    ]


def get_context(app, request, **kwargs):
    context = {
        'request': request,
        'nav': get_nav(app),
    }
    for key, value in kwargs.items():
        context[key] = value
    return context
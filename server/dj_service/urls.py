"""dj_service URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from ariadne.contrib.django.views import GraphQLView
from django.conf import settings
from django.urls import path

from gql.error_formatter import format_error
from gql.schema import schema
from hardware.views import collect_msinfo

base_settings = {
    'schema': schema,
    'error_formatter': format_error,
    'http_method_names': [method for method in GraphQLView.http_method_names if method != 'get']
}

debug_settings = {
    'http_method_names': GraphQLView.http_method_names
}

ariadne_settings = base_settings | debug_settings if settings.DEBUG else base_settings

urlpatterns = [
    path('api/collect-msinfo/', collect_msinfo),
    path('api/', GraphQLView.as_view(**ariadne_settings), name='api'),
]

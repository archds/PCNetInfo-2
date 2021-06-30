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
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from ariadne.contrib.django.views import GraphQLView

import hardware.views
from gql_api.api import schema

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', hardware.views.pc_list, name='root'),
    path('files/<str:file_name>', hardware.views.get_file, name='file'),
    path('pc/', include('hardware.urls')),
    path('monitor/', TemplateView.as_view(template_name='wip_cover.html'), name='monitor'),
    path('api/', GraphQLView.as_view(schema=schema), name='api')
]

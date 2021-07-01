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
from django.contrib import admin
from django.urls import path, include

import hardware.views
from gql_api.api import schema

urlpatterns = [
    path('', hardware.views.pc_list, name='root'),
    path('api/', GraphQLView.as_view(schema=schema), name='api'),
    path('pc/', include('hardware.urls')),
    path('monitor/', hardware.views.monitor_list, name='monitor'),
    path('admin/', admin.site.urls),
    path('files/<str:file_name>', hardware.views.get_file, name='file'),
]

handler404 = 'hardware.views.not_found'

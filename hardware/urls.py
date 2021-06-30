from django.urls import path
from hardware.views import pc_view

urlpatterns = [
    path('<str:pc_name>', pc_view, name='pc_view'),
]
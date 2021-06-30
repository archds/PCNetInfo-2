from django.urls import path
from hardware.views import *

urlpatterns = [
    path('<str:pc_name>', test_pc_page, name='pc_view'),
]
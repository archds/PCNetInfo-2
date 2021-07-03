from django.urls import path

from hardware.views import pc_view, add_pc

urlpatterns = [
    path('<str:pc_name>', pc_view, name='pc_view'),
    path('', add_pc, name='add_pc'),
]
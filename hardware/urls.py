from django.urls import path

from hardware.views import pc_view, add_pc, add_pc_interactive

urlpatterns = [
    path('<str:pc_name>', pc_view, name='pc_view'),
    path('', add_pc, name='add_pc'),
    path('add/', add_pc_interactive, name='add_pc_interactive'),
]
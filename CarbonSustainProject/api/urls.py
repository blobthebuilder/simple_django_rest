from django.urls import path
from .views import actions_list, action_detail

urlpatterns = [
    path("actions/", actions_list, name="actions_list"),
    path("actions/<int:pk>/", action_detail, name="action_detail"),
]

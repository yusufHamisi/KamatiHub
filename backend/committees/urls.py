from django.urls import path

from .views import CommitteeListCreateView


urlpatterns = [
    path("", CommitteeListCreateView.as_view(), name="committee-list-create"),
]
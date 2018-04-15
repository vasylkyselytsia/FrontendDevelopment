from django.urls import re_path, include
from django.views.generic import TemplateView

urlpatterns = [
    re_path(r'^$', TemplateView.as_view(template_name="index.html"), name="index"),
    re_path(r"^api/", include("api.urls"), name="api")
]

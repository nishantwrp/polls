from django.urls import path
from .views import ListQuestionView


urlpatterns = [
    path('questions/', ListQuestionView.as_view(), name="questions-all")
]
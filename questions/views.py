from django.shortcuts import render
from rest_framework import viewsets
from .models import question
from .serializers import questionSerializer
# Create your views here.
class ListQuestionView(viewsets.ModelViewSet):
    """
    Provides a get method handler.
    """
    queryset = question.objects.all()
    serializer_class = questionSerializer
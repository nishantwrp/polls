from rest_framework import serializers
from .models import question
class questionSerializer(serializers.ModelSerializer):
    class Meta:
        model = question
        fields = ("ques","opt1","opt2","opt3","opt4","vot1","vot2","vot3","vot4","id")
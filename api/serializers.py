from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *
class PollsSerializer(serializers.ModelSerializer):
    class Meta:
        model = poll
        fields = ('question','status','id')

class PollCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = poll
        fields = ('question','option_1','option_2','option_3','option_4')

class PollIdSerializer(serializers.Serializer):
    id = serializers.IntegerField()

class PollQuestionsResponseSerializer(serializers.ModelSerializer):
    creator_name = serializers.CharField(max_length=500)
    voted = serializers.BooleanField()
    class Meta:
        model = poll
        fields = ('question','option_1','option_2','option_3','option_4','status','creator_name','voted')

class ResponseSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=500)

class VoteSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    choice = serializers.IntegerField()



class PollVotesResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = poll
        fields = ('votes_1','votes_2','votes_3','votes_4')

class CreatedAndParticipatedPollsSerializer(serializers.Serializer):
    created = PollsSerializer(many=True)
    participated = PollsSerializer(many=True)


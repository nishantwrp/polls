from rest_framework import serializers
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','first_name','last_name','password')
    
class ResponseSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=500)

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','password')

class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(max_length=500)
    new_password = serializers.CharField(max_length=500)

class TokenResponseSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=500)
    token = serializers.CharField(max_length=500)
    name = serializers.CharField(max_length=500)
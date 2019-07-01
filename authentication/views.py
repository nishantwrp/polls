from rest_framework.response import Response
from .serializers import *
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import status
from rest_framework import permissions
from rest_framework.authtoken.models import Token

def create_auth_token(user):
    token, created = Token.objects.get_or_create(user=user)
    return token

class RegisterView(generics.GenericAPIView):
    """
    Registers A New User On Polls App If Email Does Not Exist Already Otherwise Returns An Error
    """
    serializer_class = RegisterSerializer
    permission_classes = (permissions.AllowAny,)
    
    def give_response(self,message,token,name):
        response = TokenResponseSerializer({
            'message': message,
            'token': token,
            'name': name
        })
        return Response(response.data,status.HTTP_200_OK)
    
    def post(self,request):
        self.request = request
        username = request.data['username']
        try:
            User.objects.get(username=username)
            return self.give_response("email_already_exists","","")
        except:
            user =  User.objects.create_user(username, '', request.data['password'])
            user.first_name = request.data['first_name']
            user.last_name = request.data['last_name']
            user.save()
            token = create_auth_token(user)
            name = request.data['first_name'] + " " + request.data['last_name']
            return self.give_response("user_registered",token.key,name)

class LogoutView(generics.GenericAPIView):
    """
    Logout The User From Current Session
    """
    serializer_class = ResponseSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def give_response(self,message):
        response = ResponseSerializer({
            'message': message
        })
        return Response(response.data,status.HTTP_200_OK)
    
    def get(self,request):
        request.user.auth_token.delete()
        return self.give_response("logged_out")

class LoginView(generics.GenericAPIView):
    """
    Check the credentials and logs in the user
    """
    serializer_class = LoginSerializer
    permission_classes = (permissions.AllowAny,)

    def give_response(self,message,token,name):
        response = TokenResponseSerializer({
            'message' : message,
            'token': token,
            'name': name
        })
        return Response(response.data,status.HTTP_200_OK)
    
    def post(self,request):
        self.request = request
        username = request.data['username']
        password = request.data['password']
        loginit = authenticate(username=username, password=password)
        if loginit is not None:
            user = User.objects.get(username=username)
            token =  create_auth_token(user)
            first_name = user.first_name
            last_name = user.last_name
            name = first_name + " " + last_name
            return self.give_response("logged_in",token.key,name)
        else:
            return self.give_response("invalid_credentials","","")
        
class ChangePasswordView(generics.GenericAPIView):
    """
    Handles the password change request of the user
    """
    serializer_class = ChangePasswordSerializer
    permission_classes = (permissions.IsAuthenticated,)
    
    def give_response(self,message):
        response = ResponseSerializer({
            'message': message
        })
        return Response(response.data,status.HTTP_200_OK)
    
    def post(self,request):
        username = request.user.username
        current_password = request.data['current_password']
        new_password = request.data['new_password']
        test = authenticate(username=username,password=current_password)
        if test is not None:
            user = User.objects.get_by_natural_key(username)
            user.set_password(new_password)
            user.save()
            return self.give_response("password_changed")
        else:
            return self.give_response("invalid_password")
        pass

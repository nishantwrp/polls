from django.urls import path,include
from .views import *
urlpatterns = [
    path('auth/register/',RegisterView.as_view()),
    path('auth/logout/',LogoutView.as_view()),
    path('auth/login/',LoginView.as_view()),
    path('auth/password/',ChangePasswordView.as_view()),
    path('auth/',AuthenticationView.as_view()),
    
]

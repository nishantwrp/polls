from .views import *
from django.urls import path,include
urlpatterns = [
    path('polls/',CreatedAndParticipatedPollsView.as_view()),
    path('polls/create/',PollCreateView.as_view()),
    path('polls/questions/',PollQuestionsView.as_view()),
    path('polls/votes/',PollVotesView.as_view()),
    path('polls/vote/',VoteView.as_view()),
    path('polls/end/',PollEndView.as_view())
]

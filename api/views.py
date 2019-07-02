from rest_framework.response import Response
from .serializers import *
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import status
from rest_framework import permissions
from .models import *

class CreatedAndParticipatedPollsView(generics.GenericAPIView):
    """
    Returns The Polls Created And Participated By The User
    """
    serializer_class = CreatedAndParticipatedPollsSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def give_response(self,created,participated):
        response = CreatedAndParticipatedPollsSerializer({
            'created': created,
            'participated': participated
        })
        return Response(response.data,status.HTTP_200_OK)

    def get(self,request):
        dbc = poll.objects.filter(creator=request.user)
        dbp = vote.objects.filter(voter=request.user)
        created_list = list()
        participated_list = list()
        for obj in dbc:
            created_list.append(PollsSerializer({
                'question': obj.question,
                'status': obj.status,
                'id': obj.id
            }).data)
        for obj in dbp:
            participated_list.append(PollsSerializer({
                'question': obj.poll.question,
                'status': obj.poll.status,
                'id': obj.poll.id
            }).data)
        return self.give_response(created_list,participated_list)

class PollCreateView(generics.GenericAPIView):
    """
    Creates A Poll
    """
    serializer_class = PollCreateSerializer
    permission_classes = (permissions.IsAuthenticated,)
    def give_response(self,question,pstatus,id):
        response = CreatedPollsSerializer({
            'question' : question,
            'status': pstatus,
            'id':id
        })
        return Response(response.data,status.HTTP_200_OK)
    def post(self,request):
        new_poll = poll.objects.create(question=request.data['question'],option_1=request.data['option_1'],option_2=request.data['option_2'],option_3=request.data['option_3'],option_4=request.data['option_4'],creator=request.user)
        return self.give_response(new_poll.question,new_poll.status,new_poll.id)

class PollQuestionsView(generics.GenericAPIView):
    """
    Returns The Question,Options,Status Of The Poll
    """
    serializer_class = PollIdSerializer
    permission_classes = (permissions.AllowAny,)
    def give_response(self,response_data):
        response = PollQuestionsResponseSerializer(response_data)
        return Response(response.data,status.HTTP_200_OK)
    def post(self,request):
        try:
            this_poll = poll.objects.get(id=request.data['id'])
            has_voted = False
            if request.user.is_authenticated:
                tmp = vote.objects.filter(poll=this_poll,voter=request.user)
                if len(tmp) != 0:
                    has_voted = True
                if this_poll.creator == request.user:
                    has_voted = True
            response_data = {
                'question': this_poll.question,
                'option_1': this_poll.option_1,
                'option_2': this_poll.option_2,
                'option_3': this_poll.option_3,
                'option_4': this_poll.option_4,
                'status'  : this_poll.status,
                'creator_name': this_poll.creator.first_name + " " + this_poll.creator.last_name,
                'voted'       : has_voted
            }
            return self.give_response(response_data)
        except: 
            response = ResponseSerializer({
                'message' : "invalid_id"
            })
            return Response(response.data,status.HTTP_200_OK)

class VoteView(generics.GenericAPIView):
    """
    Records A Vote
    """
    serializer_class = VoteSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def give_response(self,message):
        response = ResponseSerializer({
            'message':message
        })
        return Response(response.data,status.HTTP_200_OK)

    def post(self,request):
        user = request.user
        choice = request.data['choice']
        pollid = request.data['id']
        current_poll = 1
        try:
            current_poll = poll.objects.get(id=pollid)
        except:
            return self.give_response("invalid_id")
        if (current_poll.status == False):
            return self.give_response("poll_closed")
        else:
            chk = vote.objects.filter(voter=user,poll=current_poll)
            if (len(chk) != 0):
                return self.give_response("already_voted")
            else:
                if current_poll.creator == user:
                    return self.give_response("owner_cant_vote")
                vote.objects.create(voter=user,choice=choice,poll=current_poll)
                if int(choice) == 1:
                    current_poll.votes_1 += 1
                    current_poll.save()
                    return self.give_response("vote_recorded")
                if int(choice) == 2:
                    current_poll.votes_2 += 1
                    current_poll.save()
                    return self.give_response("vote_recorded")
                if int(choice) == 3:
                    current_poll.votes_3 += 1
                    current_poll.save()
                    return self.give_response("vote_recorded")
                if int(choice) == 4:
                    current_poll.votes_4 += 1
                    current_poll.save()
                    return self.give_response("vote_recorded")

class PollVotesView(generics.GenericAPIView):
    """
    Returns The Votes Of A Poll
    """
    serializer_class = PollIdSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def give_response(self,message):
        response = ResponseSerializer({
            'message':message
        })
        return Response(response.data,status.HTTP_200_OK)

    def post(self,request):
        user = request.user
        pollid = request.data['id']
        pollid = int(pollid)
        current_poll = 1
        try:
            current_poll = poll.objects.get(id=pollid)
        except:
            return self.give_response("invalid_id")
        if ((len(vote.objects.filter(voter=user,poll=current_poll)) != 0) or (current_poll.creator == user)):
            response = PollVotesResponseSerializer({
                'votes_1': current_poll.votes_1,
                'votes_2': current_poll.votes_2,
                'votes_3': current_poll.votes_3,
                'votes_4': current_poll.votes_4,
            })
            return Response(response.data,status.HTTP_200_OK)
        else:
            return self.give_response("not_voted")

class PollEndView(generics.GenericAPIView):
    """
    Ends A Poll
    """
    serializer_class = PollIdSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def give_response(self,message):
        response = ResponseSerializer({
            'message':message
        })
        return Response(response.data,status.HTTP_200_OK)

    def post(self,request):
        user = request.user
        pollid = request.data['id']
        pollid = int(pollid)
        current_poll = 1
        try:
            current_poll = poll.objects.get(id=pollid)
        except:
            return self.give_response("invalid_id")
        if current_poll.creator == user:
            current_poll.status = False
            current_poll.save()
            return self.give_response("poll_ended")
        else:
            return self.give_response("only_owner_can_end_poll")
    
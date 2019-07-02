from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class poll(models.Model):
    creator  = models.ForeignKey(User, null = True, on_delete=models.SET_NULL)
    status   = models.BooleanField(default=True)
    question = models.CharField(max_length=500)
    option_1 = models.CharField(max_length=500)
    option_2 = models.CharField(max_length=500)
    option_3 = models.CharField(max_length=500)
    option_4 = models.CharField(max_length=500)
    votes_1  = models.IntegerField(default=0)
    votes_2  = models.IntegerField(default=0)
    votes_3  = models.IntegerField(default=0)
    votes_4  = models.IntegerField(default=0)
    def __str__(self):
        return f'{self.question}'

class vote(models.Model):
    poll = models.ForeignKey(poll,on_delete=models.CASCADE)
    voter = models.ForeignKey(User,on_delete=models.CASCADE)
    choice = models.IntegerField()
    def __str__(self):
        return f'{self.voter.first_name} {self.voter.last_name} | {self.poll.question}'

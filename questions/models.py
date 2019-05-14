from django.db import models

# Create your models here.
class question(models.Model):
    ques = models.CharField(max_length = 50)
    opt1 = models.CharField(max_length = 50)
    opt2 = models.CharField(max_length = 50)
    opt3 = models.CharField(max_length = 50)
    opt4 = models.CharField(max_length = 50)
    vot1 = models.IntegerField(default=0)
    vot2 = models.IntegerField(default=0)
    vot3 = models.IntegerField(default=0)
    vot4 = models.IntegerField(default=0)
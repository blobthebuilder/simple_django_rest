from django.db import models

# Create your models here.
class Action(models.Model):
    action = models.CharField(max_length=255)
    date = models.DateField()
    points = models.IntegerField()
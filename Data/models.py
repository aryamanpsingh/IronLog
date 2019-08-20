from django.db import models
from django.contrib.postgres.fields import ArrayField
import datetime
from django.contrib.auth.models import User


# Create your models here.


class Exercise(models.Model):
    name = models.CharField(max_length=100)
    sets = models.IntegerField()
    reps = ArrayField(models.IntegerField(), blank=True)
    weights = ArrayField(models.IntegerField(), blank=True)


'''
    def clean(self):
        if len(self.reps) > self.sets:
            raise ValidationError(_('Reps imply more sets than entered.'))
        if len(self.weights) > self.sets:
            raise ValidationError(
                _('Draft entries may not have a publication date.'))
'''


class Workout(models.Model):
    name = models.CharField(max_length=100, unique=True)
    exercise = models.ManyToManyField('Exercise')
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    owner = models.ForeignKey(
        User, related_name="order", on_delete=models.CASCADE, null=True)


class Routine(models.Model):
    name = models.CharField(max_length=100)
    workout = models.ManyToManyField('Workout')
    length = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(
        User, related_name="routine", on_delete=models.CASCADE, null=True)

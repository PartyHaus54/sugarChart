from django.db import models
from django.contrib.auth.models import User

class UserDetail(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='details')
  weight = models.IntegerField(blank=True, null=True)
  date_of_birth = models.DateField(null=True)
  age = models.IntegerField(blank=True, null=True)
  timezone = models.CharField(max_length=50, blank=True, null=True)
  show_weight = models.BooleanField(default=False)
  show_age = models.BooleanField(default=False)
  image = models.TextField(null=True)
  default_timespan = models.IntegerField(default=7)
  show_24_hours = models.BooleanField(default=False)

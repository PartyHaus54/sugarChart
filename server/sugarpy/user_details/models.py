from django.db import models
from django.contrib.auth.models import User

class UserDetail(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='details')
  weight = models.IntegerField(blank=True, null=True)
  age = models.IntegerField(blank=True, null=True)
  timezone = models.CharField(max_length=50, blank=True, null=True)

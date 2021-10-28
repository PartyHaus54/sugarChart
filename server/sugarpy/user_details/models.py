from django.db import models

# Create your models here.
class UserDetail(models.Model):
  username = models.CharField(max_length=25, blank=False, null=False, unique=True)
  date_of_birth = models.DateField(null=True)
  weight = models.IntegerField(null=True)
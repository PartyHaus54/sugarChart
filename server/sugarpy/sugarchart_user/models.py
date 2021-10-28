from django.db import models
from django.contrib.auth.models import User, AbstractUser, BaseUserManager

# class SugarChartUserManager(BaseUserManager):
#   def create_user(self, email, password, **extra_fields):
#     if not email:
#       raise ValueError('Email for user must be set.')
#     email = self.normalize_email(email)
#     user = self.model(email=email, **extra_fields)
#     user.set_password(password)
#     user.save()
#     return user

#   def create_superuser(self, email, password, **extra_fields):
#     extra_fields.setdefault('is_staff', True)
#     extra_fields.setdefault('is_superuser', True)

#     if extra_fields.get('is_staff') is not True:
#       raise ValueError('Superuser must have is_staff=True.')
#     if extra_fields.get('is_superuser') is not True:
#       raise ValueError('Superuser must have is_superuser=True.')
#     return self.create_user(email, password, **extra_fields)

class SugarChartUser(AbstractUser):
  weight = models.IntegerField(blank=True, null=True)
  age = models.IntegerField(blank=True, null=True)
  timezone = models.CharField(max_length=50, blank=True, null=True)
  #objects = SugarChartUserManager()

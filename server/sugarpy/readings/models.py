from django.db import models

# # Create your models here.
# class Reading(models.Model):
#   observed_time = models.DateTimeField()
#   entered_time = models.DateTimeField(auto_now_add=True)
#   user_id = models.IntegerField(null=False)
#   glucose_level = models.IntegerField(null=False)

#   class Meta:
#     ordering = ['observed_time']

# Create your models here.
class Reading(models.Model):
  observed_time = models.TimeField(auto_now_add=False)
  observed_date = models.DateField(auto_now_add=False)
  entered_time = models.DateTimeField(auto_now_add=True)
  user_id = models.IntegerField(null=False)
  glucose_level = models.IntegerField(null=False)

  class Meta:
    ordering = ['observed_time']
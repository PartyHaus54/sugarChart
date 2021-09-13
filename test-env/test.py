from django.db import models

class Reading(models.Model):
  user_id = models.CharField(max_length=30)
  # sugar_lvl =
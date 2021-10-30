from rest_framework import serializers
from readings.models import Reading

class ReadingSerializer(serializers.ModelSerializer):
  class Meta:
    model = Reading
    fields = (
      'id',
      'glucose_level',
      'weight_at_reading',
      'age_at_reading',
      'observed_datetime',
      'observed_time',
      'observed_date',
      'entered_time'
    )
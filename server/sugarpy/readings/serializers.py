from rest_framework import serializers
from readings.models import Reading

class ReadingSerializer(serializers.ModelSerializer):
  class Meta:
    model = Reading
    fields = ('id', 'observed_time', 'observed_date', 'glucose_level', 'entered_time')
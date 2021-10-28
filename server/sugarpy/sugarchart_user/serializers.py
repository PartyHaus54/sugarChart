from rest_framework import serializers
from sugarchart_user.models import SugarChartUser

class SugarChartUserSerializer(serializers.ModelSerializer):
  class Meta:
    model = SugarChartUser
    fields = ('__all__')
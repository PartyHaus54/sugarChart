from rest_framework import generics, permissions, renderers
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import action
from sugarchart_user.models import SugarChartUser
from sugarchart_user.serializers import SugarChartUserSerializer
from sugarchart_user.permissions import IsAdminOrCurrentUser
# from django.shortcuts import render
# from django.contrib.auth import views

class SugarChartUserList(generics.ListCreateAPIView):
  queryset = SugarChartUser.objects.all()
  serializer_class = SugarChartUserSerializer
  permissions_classes = (
    IsAdminOrCurrentUser
  )

  @action(detail=True, renderer_classes=[renderers.StaticHTMLRenderer])
  def perform_create(self, serializer):
    serializer.save()

class SugarChartUserDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = SugarChartUser.objects.all()
  serializer_class = SugarChartUserSerializer
  permissions_classes = (
    IsAdminOrCurrentUser
  )
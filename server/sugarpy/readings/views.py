from datetime import datetime, timedelta
from rest_framework import generics, permissions, renderers
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import action
from readings.models import Reading
from readings.serializers import ReadingSerializer
from readings.permissions import IsAdminOrCurrentUser

class ReadingList(generics.ListCreateAPIView):
  #queryset = Reading.objects.all()
  def get_queryset(self):
    if self.request.user.is_staff == True:
      return Reading.objects.all()
    elif not self.request.user.is_anonymous:
      user_id = self.request.user.id
      return Reading.objects.filter(user_id=user_id)
    else:
      return
  serializer_class = ReadingSerializer
  permissions_classes = (
    IsAdminOrCurrentUser
  )

  @action(detail=True, renderer_classes=[renderers.StaticHTMLRenderer])
  def perform_create(self, serializer):
    serializer.save(user_id=self.request.user.id)


class ReadingListTimeSpan(generics.ListCreateAPIView):
  #queryset = Reading.objects.all()
  def get_queryset(self):
    now = datetime.now()
    days_ago = self.kwargs['days_ago']
    time_span = timedelta(days=days_ago)
    span_start = now - time_span
    if self.request.user.is_staff == True:
      return Reading.objects.filter(observed_date__gte=span_start)
    elif not self.request.user.is_anonymous:
      user_id = self.request.user.id
      return Reading.objects.filter(user_id=user_id, observed_date__gte=span_start)
    else:
      return
  serializer_class = ReadingSerializer
  permissions_classes = (
    IsAdminOrCurrentUser
  )

  @action(detail=True, renderer_classes=[renderers.StaticHTMLRenderer])
  def perform_create(self, serializer):
    serializer.save(user_id=self.request.user.id)


class ReadingDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Reading.objects.all()
  serializer_class = ReadingSerializer
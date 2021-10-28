from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from rest_framework import generics, permissions, renderers
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import action
from user_details.models import UserDetail as UserDetailModel
from user_details.serializers import UserDetailSerializer, UserSerializer, RegisterUserSerializer
from user_details.permissions import IsAdminOrCurrentUser

class NewUser(generics.ListCreateAPIView):
  def get_queryset(self):
    if self.request.user.is_staff == True:
      return User.objects.all()
    elif not self.request.user.is_anonymous:
      user_id = self.request.user.id
      return User.objects.filter(user_id=user_id)
    else:
      return
  serializer_class = RegisterUserSerializer
  permissions_classes = (
    IsAdminOrCurrentUser
  )

  @action(detail=True, renderer_classes=[renderers.StaticHTMLRenderer])
  def perform_create(self, serializer):
    serializer.save()

class UserList(generics.ListCreateAPIView):
  def get_queryset(self):
    if self.request.user.is_staff == True:
      return User.objects.all()
    elif not self.request.user.is_anonymous:
      id = self.request.user.id
      return User.objects.filter(id=id)
    else:
      return
  serializer_class = UserSerializer
  permissions_classes = (
    IsAdminOrCurrentUser
  )

  @action(detail=True, renderer_classes=[renderers.StaticHTMLRenderer])
  def perform_create(self, serializer):
    serializer.save()
    # new_user = User.objects.create_user(
    #   'hard_test_2',
    #   'hard2@test.sometimes',
    #   'Test1379'
    # )
    # # new_user_id = new_user.id
    # # new_user_detail = UserDetail.objects.create(
    # #   user = new_user_id,
    # #   age = 25,
    # #   weight = 150,
    # #   timezone = 'US/Pacific'
    # # )

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
  def get_queryset(self):
    id = self.kwargs['pk']
    if self.request.user.is_staff == True:
      return User.objects.filter(id=id)
    elif not self.request.user.is_anonymous:
      user = self.request.user.id
      return User.objects.filter(user=user)
    else:
      return
  serializer_class = UserSerializer
  permissions_classes = (
    IsAdminOrCurrentUser
  )

class UserDetailList(generics.ListCreateAPIView):
  def get_queryset(self):
    if self.request.user.is_staff == True:
      return UserDetailModel.objects.all()
    elif not self.request.user.is_anonymous:
      user = self.request.user.id
      return UserDetailModel.objects.filter(user=user)
    else:
      return
  serializer_class = UserDetailSerializer
  permissions_classes = (
    IsAdminOrCurrentUser
  )

  @action(detail=True, renderer_classes=[renderers.StaticHTMLRenderer])
  def perform_create(self, serializer):
    serializer.save(user_id=self.request.user.id)

class SinglerUserDetail(generics.RetrieveUpdateDestroyAPIView):
  def get_queryset(self):
    id = self.kwargs['pk']
    if self.request.user.is_staff == True:
      return UserDetailModel.objects.filter(id=id)
    elif not self.request.user.is_anonymous:
      user = self.request.user.id
      return UserDetailModel.objects.filter(id=id, user=user)
    else:
      return
  serializer_class = UserDetailSerializer
  permissions_classes = (
    IsAdminOrCurrentUser
  )

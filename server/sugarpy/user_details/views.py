from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from rest_framework import generics, permissions, renderers
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from user_details.models import UserDetail as UserDetailModel
from user_details.serializers import UserDetailSerializer, UserSerializer, RegisterUserSerializer
from user_details.permissions import IsAdminOrCurrentUser

class LoginStatus(APIView):
  def get(self, request):
    print(self.request.user)
    if self.request.user.is_anonymous:
      return Response(False)
    else:
      return Response(True)

class Logout(APIView):
  def post(self, request):
    return self.delete_auth_token(request)

  def delete_auth_token(self, request):
    request.user.auth_token.delete()
    return Response('User logged out successfully')

class ChangePassword(APIView):
  def post(self, request):
    return self.update_password(request)

  def update_password(self, request):
    password = request.data['password']
    print('PASSWORD IS')
    print(password)
    request.user.set_password(password)
    request.user.save()
    return Response('Password updated')

class NewUser(generics.ListCreateAPIView):
  def get_queryset(self):
    if self.request.user.is_staff == True:
      return User.objects.all()
    elif not self.request.user.is_anonymous:
      auth_token = self.request.user.auth_token
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

# class UserPasswordUpdate(generics.ListCreateAPIView):
#   def get_queryset(self):
#     username = self.request.user.username
#     return User.objects.filter(username=user_id)
#   serializer_class = UpdateUserPasswordSerializer
#   permissions_classes = (
#     IsAdminOrCurrentUser
#   )

#   @action(detail=True, renderer_classes=[renderers.StaticHTMLRenderer])
#   def perform_create(self, serializer):
#     serializer.save()

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

class UserSelfDetail(generics.ListCreateAPIView):
  def get_queryset(self):
    #id = self.kwargs['pk']
    if self.request.user.is_staff == True:
      return User.objects.filter(id=id)
    elif not self.request.user.is_anonymous:
      id = self.request.user.id
      return User.objects.filter(id=id)
    else:
      return
  serializer_class = UserSerializer
  permissions_classes = (
    IsAdminOrCurrentUser
  )

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

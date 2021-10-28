from rest_framework import serializers
from django.contrib.auth.models import User
from user_details.models import UserDetail as UserDetail

class UserDetailSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserDetail
    fields = ('age', 'weight', 'timezone')

class RegisterUserSerializer(serializers.HyperlinkedModelSerializer):
  details = UserDetailSerializer(many=False, read_only=True)

  class Meta:
    model = User
    fields = ['username', 'password', 'details']

  def create(self, validated_data):
    print(validated_data)
    user = User.objects.create_user(
      username=validated_data['username'],
      password=validated_data['password']
    )

    print(user.id)

    user.save()
    return user

class UserSerializer(serializers.HyperlinkedModelSerializer):
  details = UserDetailSerializer(many=False, read_only=True)

  class Meta:
    model = User
    fields = ['username', 'details']

  # def create(self, validated_data):
  #   print(validated_data)
  #   user = User.objects.create_user(
  #     username=validated_data['username'],
  #     password=validated_data['password']
  #   )

  #   print(user.id)

  #   user.save()
  #   return user
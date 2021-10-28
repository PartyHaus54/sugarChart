from rest_framework import serializers
from django.contrib.auth.models import User
from user_details.models import UserDetail as UserDetailModel

class UserDetailSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserDetailModel
    fields = ('user', 'age', 'weight', 'timezone')

class UserSerializer(serializers.HyperlinkedModelSerializer):
  details = UserDetailSerializer(many=False, read_only=True)

  class Meta:
    model = User
    fields = ['id', 'username', 'first_name', 'last_name', 'email', 'details', 'password']

  def create(self, validated_data):
    print(validated_data)
    user = User.objects.create_user(
      username=validated_data['username'],
      password=validated_data['password']
    )

    user.save()
    return user
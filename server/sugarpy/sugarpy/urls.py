"""sugarpy URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from django.contrib import admin

from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from rest_framework.authtoken.views import obtain_auth_token

from readings.views import ReadingDetail, ReadingList, ReadingListTimeSpan
from user_details.views import SinglerUserDetail, UserDetailList, UserList, UserDetail, NewUser, UserSelfDetail, Logout, ChangePassword, LoginStatus
#from sugarchart_user.views import SugarChartUserList, SugarChartUserDetail

#from user_details.serializers import UserDetailSerializer

#from sugarchart_user.models import SugarChartUser

# Serializers define the API representation
# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     #user_details = UserDetailSerializer(many=True, read_only=True)
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'first_name', 'last_name', 'email']

# Serializers define the API representation
# class SugarChartUserSerializer(serializers.HyperlinkedModelSerializer):
#     #user_details = UserDetailSerializer(many=True, read_only=True)
#     class Meta:
#         model = SugarChartUser
#         fields = ['username', 'first_name', 'last_name', 'email']

# ViewSets define the view behavior
# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

# ViewSets define the view behavior
# class SugarChartUserViewSet(viewsets.ModelViewSet):
#     queryset = SugarChartUser.objects.all()
#     serializer_class = SugarChartUserSerializer

# Routers provide an easy way of automatically determining the URL conf
router = routers.DefaultRouter()
#router.register(r'users', UserList.as_view())
#router.register(r'sugarchart_users', SugarChartUserViewSet)

# Wire up our API using automatic URL routing
# Additionally, we include login URLs for the browsable API
urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('users/', UserList.as_view()),
    path('user_info/', UserSelfDetail.as_view()),
    path('users/<int:pk>/', UserDetail.as_view()),
    path('register/', NewUser.as_view()),
    path('user/login_status/', LoginStatus.as_view()),
    path('user/login/', obtain_auth_token),
    path('user/logout/', Logout.as_view()),
    path('user/change_password/', ChangePassword.as_view()),
    path('api-auth/', include('rest_framework.urls')),
    #path('api/login/', login),
    path('api/readings/', ReadingList.as_view()),
    path('api/readings/<int:pk>/', ReadingDetail.as_view()),
    path('api/readings_since/<int:days_ago>/', ReadingListTimeSpan.as_view()),
    path('api/user_details/', UserDetailList.as_view()),
    path('api/user_details/<int:pk>/', SinglerUserDetail.as_view())
]

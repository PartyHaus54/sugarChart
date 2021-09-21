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

# Serializers define the API representation
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'is_staff', 'is_active', 'date_joined']

# ViewSets definte the view behavior
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Routers provide an easy way of automatically determining the URL conf
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

# Wire up our API using automatic URL routing
# Additionally, we include login URLs for the browsable API
urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('user/login/', obtain_auth_token),
    path('api-auth/', include('rest_framework.urls')),
    #path('api/login/', login),
    path('api/readings/', ReadingList.as_view()),
    #path('api/readings/<int:pk>/', ReadingDetail.as_view())
    path('api/readings_since/<int:days_ago>/', ReadingListTimeSpan.as_view())
]

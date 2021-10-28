from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from user_details.models import UserDetail

class UserDetailInline(admin.StackedInline):
  model = UserDetail
  can_delete = False
  verbose_name_plural = 'user details'

class UserAdmin(BaseUserAdmin):
  inlines = (UserDetailInline,)

admin.site.unregister(User)
admin.site.register(User, UserAdmin)

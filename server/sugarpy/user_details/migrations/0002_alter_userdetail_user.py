# Generated by Django 3.2.7 on 2021-10-28 06:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('user_details', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdetail',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='details', to=settings.AUTH_USER_MODEL),
        ),
    ]
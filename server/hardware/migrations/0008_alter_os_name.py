# Generated by Django 3.2.7 on 2021-09-23 11:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hardware', '0007_auto_20210923_1130'),
    ]

    operations = [
        migrations.AlterField(
            model_name='os',
            name='name',
            field=models.CharField(max_length=50),
        ),
    ]
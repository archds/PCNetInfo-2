# Generated by Django 3.2.4 on 2021-06-26 05:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hardware', '0003_auto_20210626_1252'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pc',
            name='serial_number',
            field=models.IntegerField(null=True),
        ),
    ]

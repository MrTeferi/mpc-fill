# Generated by Django 3.2.5 on 2022-02-22 18:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cardpicker', '0018_auto_20210922_1827'),
    ]

    operations = [
        migrations.AlterField(
            model_name='source',
            name='drive_link',
            field=models.CharField(max_length=200, unique=False),
        ),
    ]

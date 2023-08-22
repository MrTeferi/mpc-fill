# Generated by Django 4.2.3 on 2023-08-21 10:46

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [("cardpicker", "0034_tag")]

    operations = [
        migrations.AlterField(
            model_name="card",
            name="tags",
            field=django.contrib.postgres.fields.ArrayField(
                base_field=models.CharField(max_length=20), blank=True, default=list, size=None
            ),
        ),
        migrations.AlterField(
            model_name="tag",
            name="aliases",
            field=django.contrib.postgres.fields.ArrayField(
                base_field=models.CharField(max_length=200), blank=True, default=list, size=None
            ),
        ),
    ]

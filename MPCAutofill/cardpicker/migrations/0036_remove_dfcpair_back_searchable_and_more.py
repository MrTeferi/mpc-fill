# Generated by Django 4.2.3 on 2023-08-18 12:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [("cardpicker", "0035_alter_card_tags_alter_tag_aliases")]

    operations = [
        migrations.RemoveField(model_name="dfcpair", name="back_searchable"),
        migrations.RemoveField(model_name="dfcpair", name="front_searchable"),
        migrations.AlterField(model_name="dfcpair", name="back", field=models.CharField(max_length=200)),
    ]
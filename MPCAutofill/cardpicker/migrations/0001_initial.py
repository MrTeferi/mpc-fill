# Generated by Django 3.2.5 on 2021-10-03 11:56

import datetime

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="DFCPair",
            fields=[
                (
                    "front",
                    models.CharField(max_length=200, primary_key=True, serialize=False),
                ),
                ("back", models.CharField(max_length=200, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name="Source",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("key", models.CharField(max_length=50, unique=True)),
                (
                    "source_type",
                    models.CharField(
                        choices=[
                            ("GOOGLE_DRIVE", "Google Drive"),
                            ("LOCAL", "Local File"),
                        ],
                        default="GOOGLE_DRIVE",
                        max_length=12,
                    ),
                ),
                ("drive_id", models.CharField(max_length=100, null=True)),
                (
                    "drive_link",
                    models.CharField(max_length=200, null=True),
                ),
                ("description", models.CharField(max_length=400)),
                ("order", models.IntegerField(default=0)),
            ],
            options={
                "ordering": ["order"],
            },
        ),
        migrations.CreateModel(
            name="Token",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("drive_id", models.CharField(max_length=50, null=True)),
                ("extension", models.CharField(max_length=200)),
                ("file_path", models.CharField(max_length=300, null=True)),
                ("static_path", models.CharField(max_length=200, null=True)),
                ("name", models.CharField(max_length=200)),
                ("priority", models.IntegerField(default=0)),
                ("source_verbose", models.CharField(max_length=50)),
                ("searchq", models.CharField(max_length=200)),
                ("searchq_keyword", models.CharField(max_length=200)),
                ("dpi", models.IntegerField(default=0)),
                ("date", models.DateTimeField(default=datetime.datetime.now)),
                ("size", models.IntegerField()),
                (
                    "source",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="cardpicker.source",
                    ),
                ),
            ],
            options={
                "ordering": ["-priority"],
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Cardback",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("drive_id", models.CharField(max_length=50, null=True)),
                ("extension", models.CharField(max_length=200)),
                ("file_path", models.CharField(max_length=300, null=True)),
                ("static_path", models.CharField(max_length=200, null=True)),
                ("name", models.CharField(max_length=200)),
                ("priority", models.IntegerField(default=0)),
                ("source_verbose", models.CharField(max_length=50)),
                ("searchq", models.CharField(max_length=200)),
                ("searchq_keyword", models.CharField(max_length=200)),
                ("dpi", models.IntegerField(default=0)),
                ("date", models.DateTimeField(default=datetime.datetime.now)),
                ("size", models.IntegerField()),
                (
                    "source",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="cardpicker.source",
                    ),
                ),
            ],
            options={
                "ordering": ["-priority"],
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Card",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("drive_id", models.CharField(max_length=50, null=True)),
                ("extension", models.CharField(max_length=200)),
                ("file_path", models.CharField(max_length=300, null=True)),
                ("static_path", models.CharField(max_length=200, null=True)),
                ("name", models.CharField(max_length=200)),
                ("priority", models.IntegerField(default=0)),
                ("source_verbose", models.CharField(max_length=50)),
                ("searchq", models.CharField(max_length=200)),
                ("searchq_keyword", models.CharField(max_length=200)),
                ("dpi", models.IntegerField(default=0)),
                ("date", models.DateTimeField(default=datetime.datetime.now)),
                ("size", models.IntegerField()),
                (
                    "source",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="cardpicker.source",
                    ),
                ),
            ],
            options={
                "ordering": ["-priority"],
                "abstract": False,
            },
        ),
    ]

# Generated by Django 3.1.2 on 2021-02-20 08:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_run_is_public'),
    ]

    operations = [
        migrations.RenameField(
            model_name='countentry',
            old_name='measurement',
            new_name='count',
        ),
    ]

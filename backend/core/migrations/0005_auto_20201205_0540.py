# Generated by Django 3.1.2 on 2020-12-05 05:40

from django.db import migrations


class Migration(migrations.Migration):
    atomic = False
    
    dependencies = [
        ('core', '0004_rename_measurement_entry_field'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Measurement',
            new_name='Count',
        ),
        migrations.RenameModel(
            old_name='MeasurementEntry',
            new_name='CountEntry',
        ),
    ]
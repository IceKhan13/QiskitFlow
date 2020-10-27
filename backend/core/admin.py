from django.contrib import admin

from .models import Experiment, Run, Metric, Parameter, Measurement, MeasurementEntry


admin.site.register(Experiment)
admin.site.register(Run)
admin.site.register(Metric)
admin.site.register(Parameter)
admin.site.register(Measurement)
admin.site.register(MeasurementEntry)

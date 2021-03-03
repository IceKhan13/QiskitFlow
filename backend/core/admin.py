from django.contrib import admin

from .models import (Experiment, Run, Metric, Parameter,
                     Count, CountEntry, StateVector, ComplexNumber)


admin.site.register(Experiment)
admin.site.register(Run)
admin.site.register(Metric)
admin.site.register(Parameter)
admin.site.register(Count)
admin.site.register(CountEntry)
admin.site.register(StateVector)
admin.site.register(ComplexNumber)

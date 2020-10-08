from django.contrib import admin

from .models import *

class ExperimentAdmin(admin.ModelAdmin):
    model = Experiment
    list_foreign_key_links = ('runs',)


class RunAdmin(admin.ModelAdmin):
    pass

class MetricAdmin(admin.ModelAdmin):
    pass

class ParameterAdmin(admin.ModelAdmin):
    pass

class MeasureAdmin(admin.ModelAdmin):
    pass

class MeasurementAdmin(admin.ModelAdmin):
    pass



admin.site.register(Experiment, ExperimentAdmin)
admin.site.register(Run, RunAdmin)
admin.site.register(Metric, MetricAdmin)
admin.site.register(Parameter, ParameterAdmin)
admin.site.register(Measure, MeasureAdmin)
admin.site.register(Measurement, MeasurementAdmin)


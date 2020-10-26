from django.db import models


class Experiment(models.Model):
    """ Base class for experiments. """
    name = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    archive = models.FileField(null=True, blank=True)


class Run(models.Model):
    """ Base class for experiment runs. """
    uuid = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    experiment = models.ForeignKey(Experiment,
                                   on_delete=models.CASCADE,
                                   related_name='runs')


class Metric(models.Model):
    """ Base class for logged metric. """
    name = models.CharField(max_length=255)
    value = models.FloatField()

    run = models.ForeignKey(Run,
                            on_delete=models.CASCADE,
                            related_name='metrics')


class Parameter(models.Model):
    """ Base class for logged parameter. """
    name = models.CharField(max_length=255)
    value = models.CharField(max_length=255)

    run = models.ForeignKey(Run,
                            on_delete=models.CASCADE,
                            related_name='parameters')


class Measurement(models.Model):
    """ Base class for logged measurement. """
    run = models.ForeignKey(Run,
                            on_delete=models.CASCADE,
                            related_name='measurements')


class MeasurementEntry(models.Model):
    """ Class for measurement entry. """
    key = models.CharField(max_length=255)
    value = models.FloatField()

    run = models.ForeignKey(Measurement,
                            on_delete=models.CASCADE,
                            related_name='entry')

from django.contrib.auth.models import User
from django.db import models


class Experiment(models.Model):
    """ Base class for experiments. """
    name = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    archive = models.FileField(null=True, blank=True)

    author = models.ForeignKey(User,
                               on_delete=models.CASCADE,
                               related_name='experiments')

    def __str__(self):
        return self.name


class Run(models.Model):
    """ Base class for experiment runs. """
    uuid = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    experiment = models.ForeignKey(Experiment,
                                   on_delete=models.CASCADE,
                                   related_name='runs')

    def __str__(self):
        return self.uuid


class Metric(models.Model):
    """ Base class for logged metric. """
    name = models.CharField(max_length=255)
    value = models.FloatField()

    run = models.ForeignKey(Run,
                            on_delete=models.CASCADE,
                            related_name='metrics')

    def __str__(self):
        return "{}:{}".format(self.name, self.value)


class Parameter(models.Model):
    """ Base class for logged parameter. """
    name = models.CharField(max_length=255)
    value = models.CharField(max_length=255)

    run = models.ForeignKey(Run,
                            on_delete=models.CASCADE,
                            related_name='parameters')

    def __str__(self):
        return "{}:{}".format(self.name, self.value)


class Count(models.Model):
    """ Base class for logged measurement. """
    run = models.ForeignKey(Run,
                            on_delete=models.CASCADE,
                            related_name='measurements')


class CountEntry(models.Model):
    """ Class for measurement entry. """
    key = models.CharField(max_length=255)
    value = models.FloatField()

    measurement = models.ForeignKey(Count,
                                    on_delete=models.CASCADE,
                                    related_name='entries')

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
    run_id = models.CharField(max_length=255)
    is_public = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    timestamp = models.IntegerField()  # local execution time

    version = models.CharField(max_length=100, default="NA")

    experiment = models.ForeignKey(Experiment,
                                   on_delete=models.CASCADE,
                                   related_name='runs')

    description = models.TextField(default="")

    def __str__(self):
        return self.run_id


class StateVector(models.Model):
    """ Base class for logged state vector. """
    name = models.CharField(max_length=255)

    run = models.ForeignKey(Run,
                            on_delete=models.CASCADE,
                            related_name='state_vectors')

    def __str__(self):
        return self.name


class ComplexNumber(models.Model):
    """ General model for complex numbers. """
    real = models.FloatField()
    img = models.FloatField(default=0.0)

    state_vector = models.ForeignKey(StateVector,
                                     on_delete=models.CASCADE,
                                     related_name='vector')

    def __str__(self):
        return "{} + j{}".format(self.real, self.img)


class Metric(models.Model):
    """ Base class for logged metric. """
    name = models.CharField(max_length=255)
    value = models.FloatField()
    timestamp = models.IntegerField()

    run = models.ForeignKey(Run,
                            on_delete=models.CASCADE,
                            related_name='metrics')

    def __str__(self):
        return "{}:{}".format(self.name, self.value)


class Parameter(models.Model):
    """ Base class for logged parameter. """
    name = models.CharField(max_length=255)
    value = models.CharField(max_length=255)
    timestamp = models.IntegerField()

    run = models.ForeignKey(Run,
                            on_delete=models.CASCADE,
                            related_name='parameters')

    def __str__(self):
        return "{}:{}".format(self.name, self.value)


class Count(models.Model):
    """ Base class for logged measurement. """
    name = models.CharField(max_length=255)
    run = models.ForeignKey(Run,
                            on_delete=models.CASCADE,
                            related_name='counts')


class CountEntry(models.Model):
    """ Class for measurement entry. """
    key = models.CharField(max_length=255)
    value = models.FloatField()

    count = models.ForeignKey(Count,
                              on_delete=models.CASCADE,
                              related_name='entries')

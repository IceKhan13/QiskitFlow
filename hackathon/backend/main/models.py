from django.db import models


class Experiment(models.Model):
    name = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    archive = models.FileField(null=True, blank=True)


class Run(models.Model):
    uuid = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    experiment = models.ForeignKey(
        Experiment,
        on_delete=models.CASCADE,
        related_name='runs'
    )


class Metric(models.Model):
    name = models.CharField(max_length=255)
    value = models.FloatField()

    run = models.ForeignKey(
        Run,
        on_delete=models.CASCADE,
        related_name='metrics'
    )


class Parameter(models.Model):
    name = models.CharField(max_length=255)
    value = models.CharField(max_length=255)

    run = models.ForeignKey(
        Run,
        on_delete=models.CASCADE,
        related_name='parameters'
    )


class Measurement(models.Model):
    run = models.ForeignKey(
        Run,
        on_delete=models.CASCADE,
        related_name='measurements'
    )

class Measure(models.Model):
    key = models.CharField(max_length=255)
    value = models.FloatField()

    measurement = models.ForeignKey(
        Measurement,
        on_delete=models.CASCADE,
        related_name='measures'
    )




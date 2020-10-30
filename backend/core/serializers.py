from rest_framework import serializers

from .models import Measurement, MeasurementEntry, Metric, Parameter, Run, Experiment


class MeasurementEntrySerializer(serializers.ModelSerializer):
    """ Serializer for measurement entry. """
    class Meta:
        model = MeasurementEntry
        fields = '__all__'


class MeasurementSerializer(serializers.ModelSerializer):
    """ Serializer for measurement. """
    entries = MeasurementEntrySerializer(many=True)

    class Meta:
        model = Measurement
        fields = '__all__'


class MetricSerializer(serializers.ModelSerializer):
    """ Serializer for metric. """
    class Meta:
        model = Metric
        fields = '__all__'


class ParameterSerializer(serializers.ModelSerializer):
    """ Serializer for parameter. """
    class Meta:
        model = Parameter
        fields = '__all__'


class RunSerializer(serializers.ModelSerializer):
    """ Serializer for experiment run. """

    metrics = MetricSerializer(many=True)
    parameters = ParameterSerializer(many=True)
    measurements = MeasurementSerializer(many=True)

    class Meta:
        model = Run
        fields = '__all__'


class ExperimentSerializer(serializers.ModelSerializer):
    """ Serializer for experiment. """
    runs = RunSerializer(many=True)

    class Meta:
        model = Experiment
        fields = '__all__'

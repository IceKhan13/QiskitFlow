from rest_framework import serializers

from .models import Count, CountEntry, Metric, Parameter, Run, Experiment


class CountEntrySerializer(serializers.ModelSerializer):
    """ Serializer for measurement entry. """
    class Meta:
        model = CountEntry
        fields = '__all__'


class CountSerializer(serializers.ModelSerializer):
    """ Serializer for measurement. """
    entries = CountEntrySerializer(many=True)

    class Meta:
        model = Count
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
    counts = CountSerializer(many=True)

    class Meta:
        model = Run
        fields = '__all__'


class ExperimentSerializer(serializers.ModelSerializer):
    """ Serializer for experiment. """
    runs = RunSerializer(many=True)

    class Meta:
        model = Experiment
        fields = ['runs', "name"]

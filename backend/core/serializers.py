from rest_framework import serializers

from .models import (Count, CountEntry, Metric, Parameter,
                     Run, Experiment, StateVector, ComplexNumber)


class ComplexNumberSerializer(serializers.ModelSerializer):
    """ Serializer for complex numbers. """
    class Meta:
        model = ComplexNumber
        fields = ['real', 'img']


class StateVectorSerializer(serializers.ModelSerializer):
    """ Serializer for state vector. """
    vector = ComplexNumberSerializer(many=True)

    class Meta:
        model = StateVector
        fields = '__all__'


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
    id = serializers.IntegerField(read_only=True)
    metrics = MetricSerializer(many=True)
    parameters = ParameterSerializer(many=True)
    counts = CountSerializer(many=True)
    state_vectors = StateVectorSerializer(many=True)

    class Meta:
        model = Run
        fields = '__all__'


class ExperimentSerializer(serializers.ModelSerializer):
    """ Serializer for experiment. """
    runs = RunSerializer(many=True)

    class Meta:
        model = Experiment
        fields = ['id', 'runs', "name", "created_at"]

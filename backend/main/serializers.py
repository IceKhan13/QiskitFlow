from rest_framework import routers, serializers, viewsets

from .models import *


class MeasureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Measure
        fields = '__all__'


class MeasurementSerializer(serializers.ModelSerializer):
    measures = MeasureSerializer(many=True)

    class Meta:
        model = Measurement
        fields = '__all__'


class MetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = Metric
        fields = '__all__'


class ParameterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parameter
        fields = '__all__'


class RunSerializer(serializers.ModelSerializer):
    metrics = MetricSerializer(many=True)
    parameters = ParameterSerializer(many=True)
    measurements = MeasurementSerializer(many=True)

    class Meta:
        model = Run
        fields = '__all__'


class ExperimentSerializer(serializers.ModelSerializer):
    runs = RunSerializer(many=True)

    class Meta:
        model = Experiment
        fields = '__all__'
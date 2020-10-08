from rest_framework import routers, serializers, viewsets

from .models import Experiment


class ExperimentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Experiment
        fields = '__all__'

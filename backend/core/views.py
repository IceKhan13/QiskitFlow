from rest_framework import viewsets, renderers
from rest_framework.decorators import action

from .models import Experiment, Run
from .serializers import ExperimentSerializer, RunSerializer


class ExperimentViewSet(viewsets.ModelViewSet):
    """ Views for experiment. """
    queryset = Experiment.objects.all()
    serializer_class = ExperimentSerializer

    @action(detail=False, methods=['post'], renderer_classes=[renderers.JSONRenderer])
    def share(self, request, *args, **kwargs):
        """ Share experiment runs."""
        # TODO: implement
        raise NotImplementedError("Method is not implemented yet.")


class RunViewSet(viewsets.ModelViewSet):
    """ Views for experiment run. """
    queryset = Run.objects.all()
    serializer_class = RunSerializer

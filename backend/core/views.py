from django.http import JsonResponse
from rest_framework import viewsets, renderers
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from common.models import Experiment as ExperimentClass
from utils.adapters import ObjectToModelAdapter
from .models import Experiment, Run
from .permissions import UserExperimentPermission, UserRunPermission
from .serializers import ExperimentSerializer, RunSerializer


class ExperimentViewSet(viewsets.ModelViewSet):
    """ Views for experiment. """
    queryset = Experiment.objects.all()
    serializer_class = ExperimentSerializer
    permission_classes = [IsAuthenticated, UserExperimentPermission]

    @action(detail=False, methods=['post'], renderer_classes=[renderers.JSONRenderer])
    def share(self, request, *args, **kwargs):
        """ Share experiment runs."""
        if request.data:
            # TODO: handle sourcecode archive upload

            experiment_object = ExperimentClass.load_from_dict(request.data)
            experiment = ObjectToModelAdapter.run(experiment_object, author=request.user)
            experiment.save()

            return JsonResponse({
                "message": "Experiment #{} has been saved.".format(experiment.id)
            })
        else:
            return JsonResponse({
                "message": "No run data has been provided."
            }, status=400)

    def get_queryset(self):
        """ Queryset should only return users own experiments. """
        if self.request.user.is_authenticated:
            return Experiment.objects.filter(author=self.request.user)


class RunViewSet(viewsets.ModelViewSet):
    """ Views for experiment run. """
    queryset = Run.objects.all()
    serializer_class = RunSerializer
    permission_classes = [IsAuthenticated, UserRunPermission]

    def get_queryset(self):
        """ Queryset should only return users own experiment runs.  """
        if self.request.user.is_authenticated:
            return Run.objects.filter(experiment__author=self.request.user)

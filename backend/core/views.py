from django.http import JsonResponse
from rest_framework import viewsets, renderers
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from utils.adapters import RequestToModelAdapter
from .models import Experiment, Run
from .permissions import UserExperimentPermission, UserRunPermission
from .serializers import ExperimentSerializer, RunSerializer


class ExperimentViewSet(viewsets.ModelViewSet):
    """ Views for experiment. """
    queryset = Experiment.objects.all()
    serializer_class = ExperimentSerializer
    permission_classes = [IsAuthenticated, UserExperimentPermission]

    def get_queryset(self):
        """ Queryset should only return users own experiments. """
        if self.request.user.is_authenticated:
            return Experiment.objects.filter(author=self.request.user)


class RunViewSet(viewsets.ModelViewSet):
    """ Views for experiment run. """
    queryset = Run.objects.all()
    serializer_class = RunSerializer
    permission_classes = [IsAuthenticated, UserRunPermission]

    @action(detail=False, methods=["post"], renderer_classes=[renderers.JSONRenderer])
    def share(self, request, *args, **kwargs):
        try:
            run = RequestToModelAdapter.adapt_run_from_request(request.data, author=request.user)
            return JsonResponse({
                "message": "Run [{}] has been shared successfully".format(run.run_id)
            })
        except Exception as e:
            print("Error: {}".format(e))
            return JsonResponse({
                "message": "Something went wrong during run sharing =("
            }, status=500)

    def get_queryset(self):
        """ Queryset should only return users own experiment runs.  """
        if self.request.user.is_authenticated:
            return Run.objects.filter(experiment__author=self.request.user)

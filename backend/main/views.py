from django.shortcuts import render
from rest_framework import routers, serializers, viewsets

from .models import Experiment
from .serializers import ExperimentSerializer

# Create your views here.
class ExperimentViewSet(viewsets.ModelViewSet):
    queryset = Experiment.objects.all()
    serializer_class = ExperimentSerializer

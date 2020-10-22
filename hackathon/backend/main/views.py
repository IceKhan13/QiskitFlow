from django.shortcuts import render
from rest_framework import routers, serializers, viewsets
from rest_framework.decorators import action
from rest_framework import viewsets, renderers, status as rest_status
from rest_framework.response import Response
from django.conf import settings
from django.core.files.storage import FileSystemStorage
import tarfile
import uuid
import os
import json

from .models import *
from .serializers import *


class ExperimentViewSet(viewsets.ModelViewSet):
    queryset = Experiment.objects.all()
    serializer_class = ExperimentSerializer

    @action(detail=False, methods=['post'], renderer_classes=[renderers.JSONRenderer])
    def upload(self, request, *args, **kwargs):
        """upload experiemnt"""
        # archive = request.data['file']

        # filename = archive.name

        if  request.FILES['archive']:
            myfile = request.FILES['archive']

            fs = FileSystemStorage() #defaults to   MEDIA_ROOT  
            filename = fs.save("{}_{}".format(str(uuid.uuid4().hex)[:10], myfile.name), myfile)
            file_url = fs.url(filename)

            uncompress_to = '{}/media/{}'.format(settings.PROJECT_PATH, str(uuid.uuid4().hex))

            if not os.path.exists(uncompress_to):
                os.makedirs(uncompress_to)

            with tarfile.open("{}/{}".format(settings.PROJECT_PATH, file_url), "r:gz") as tar:
                tar.extractall(uncompress_to)

            with open("{}/experiment.json".format(uncompress_to), "r") as experiment_file:
                experiment_data = json.load(experiment_file)

                experiment_name = experiment_data["name"]
                experiment, _ = Experiment.objects.get_or_create(name=experiment_name)
                experiment.archive.name = file_url.split("media")[1] 
                experiment.save()

                for run_data in experiment_data["runs"]:
                    run_uuid = run_data["id"]
                    run, created = Run.objects.get_or_create(uuid=run_uuid, experiment=experiment)
                    run.save()

                    if created:
                        for metric in run_data["metrics"]:
                            metric = Metric(name=metric["name"], value=metric["value"])
                            metric.run = run
                            metric.save()

                        for param in run_data["parameters"]:
                            parameter = Parameter(name=param["name"], value=param["value"])
                            parameter.run = run
                            parameter.save()

                        for meas in run_data["measurements"]:
                            measurement = Measurement()
                            measurement.run = run
                            measurement.save()

                            for key, value in meas.items():
                                measure = Measure(key=key, value=value)
                                measure.measurement = measurement
                                measure.save()

            return Response({
                "url": file_url,
                "status": "ok"
            })

        return Response({ "status": 200 })

class RunViewSet(viewsets.ModelViewSet):
    queryset = Run.objects.all()
    serializer_class = RunSerializer

class MetricViewSet(viewsets.ModelViewSet):
    queryset = Metric.objects.all()
    serializer_class = MetricSerializer

class ParameterViewSet(viewsets.ModelViewSet):
    queryset = Parameter.objects.all()
    serializer_class = ParameterSerializer

class MeasureViewSet(viewsets.ModelViewSet):
    queryset = Measure.objects.all()
    serializer_class = MeasureSerializer

class MeasurementViewSet(viewsets.ModelViewSet):
    queryset = Measurement.objects.all()
    serializer_class = MeasurementSerializer

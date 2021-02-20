import json
import time
from typing import List, Optional

from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate

from core.views import ExperimentViewSet, RunViewSet
from core.models import (Experiment, Run, Metric, Parameter,
                         Count, CountEntry)


def _create_stubbed_experiments(n_experiments: int,
                                n_runs: int = 2,
                                n_metrics: int = 2,
                                n_parameters: int = 2,
                                n_measurements: int = 2,
                                author: Optional[User] = None) -> List[Experiment]:
    """ Creates experiments for tests. """
    if not author:
        author, _ = User.objects.get_or_create(username="test_user", password="123")

    now = int(time.time())
    experiments = []
    for i in range(n_experiments):
        experiment = Experiment(name="Experiment #{}".format(i), author=author)
        experiment.save()

        for j in range(n_runs):
            run = Run(run_id="run #{}".format(j), experiment=experiment, timestamp=now)
            run.save()

            for m in range(n_metrics):
                metric = Metric(name="Metric {}".format(m), value=0.1, timestamp=now, run=run)
                metric.save()

            for p in range(n_parameters):
                parameter = Parameter(name="Parameter {}".format(p), value=0.1, timestamp=now, run=run)
                parameter.save()

            for m in range(n_measurements):
                count = Count(run=run, name="counts")
                count.save()

                measurement_entry = CountEntry(key="00", value=1024, count=count)
                measurement_entry.save()

            run.save()
        experiment.save()
        experiments.append(experiment)

    return experiments


class CoreApiTestCase(TestCase):
    """ Tests core module views. """
    def setUp(self) -> None:
        self.factory = APIRequestFactory()
        # create sample user for tests
        sample_user, _ = User.objects.get_or_create(username="test_user", password="123")
        self.sample_user = sample_user

        # create stubbed data
        self.experiments = _create_stubbed_experiments(2, author=sample_user)

    def test_experiments_list_unauthorized(self):
        """ Test experiment list unauthorized. """
        request = self.factory.get("/api/v1/core/experiments")
        view = ExperimentViewSet.as_view({'get': 'list'})
        response = view(request)

        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.status_text, "Unauthorized")

    def test_experiment_list_authorized(self):
        """ Test experiment list. """
        request = self.factory.get("/api/v1/core/experiments")
        view = ExperimentViewSet.as_view({'get': 'list'})
        force_authenticate(request, user=self.sample_user)
        response = view(request)

        self.assertEqual(response.data["count"], len(self.experiments))
        self.assertEqual(len(response.data["results"]), len(self.experiments))

    def test_runs_list_authorized(self):
        """ Test experiment tuns list authorized. """
        request = self.factory.get("/api/v1/core/experiments")
        view = RunViewSet.as_view({'get': 'list'})
        force_authenticate(request, user=self.sample_user)
        response = view(request)

        self.assertEqual(response.data["count"], 4)
        self.assertEqual(len(response.data["results"]), 4)

    def test_runs_list_unauthorized(self):
        """ Test experiment list unauthorized. """
        request = self.factory.get("/api/v1/core/experiments")
        view = RunViewSet.as_view({'get': 'list'})
        response = view(request)

        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.status_text, "Unauthorized")

    def test_share_experiment(self):
        """ Test share experiment. """

        post_data = {
            "version": "0.0.0",
            "name": "Quantum teleportation #0",
            "run_id": "7c5464a596d0462692d2d26286d7f85a",
            "timestamp": 1613021657,
            "metrics": [
                {"name": "measured signal", "value": 48, "timestamp": 1613021657},
                {"name": "runtime", "value": 66, "timestamp": 1613021657}
            ],
            "parameters": [
                {"name": "qiskit version", "value": "0.23.0", "timestamp": 1613021657},
                {"name": "backend", "value": "qasm_simulator", "timestamp": 1613021657},
                {"name": "number_of_shots", "value": "2734", "timestamp": 1613021657}
            ],
            "counts": [
                {
                    "name": "measurement",
                    "value": {"000": 683, "001": 683, "010": 683, "011": 683}
                }
            ],
            "artifacts": [],
            "entrypoint": None
        }

        request = self.factory.post("/api/v1/core/runs/share/", json.dumps(post_data),
                                    content_type='application/json')
        view = RunViewSet.as_view({'post': 'share'})
        force_authenticate(request, user=self.sample_user)
        response = view(request)

        self.assertEqual(response.status_code, 200)

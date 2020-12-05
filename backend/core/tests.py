import json
from typing import List, Optional

from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate

from core.views import ExperimentViewSet
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

    experiments = []
    for i in range(n_experiments):
        experiment = Experiment(name="Experiment #{}".format(i), author=author)
        experiment.save()

        for j in range(n_runs):
            run = Run(uuid="run #{}".format(j), experiment=experiment)
            run.save()

            for m in range(n_metrics):
                metric = Metric(name="Metric {}".format(m), value=0.1, run=run)
                metric.save()

            for p in range(n_parameters):
                parameter = Parameter(name="Parameter {}".format(p), value=0.1, run=run)
                parameter.save()

            for m in range(n_measurements):
                measurement = Count(run=run)
                measurement.save()

                measurement_entry = CountEntry(key="00", value=1024, measurement=measurement)
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

    def test_share_experiment(self):
        """ Test share experiment. """

        post_data = {
            "name": "test experiment",
            "run_id": "2b89911e867c42818b02e1426023a7e6",
            "metrics": [
                {"name": "test metric", "value": 0.1},
                {"name": "test metric 2", "value": 2}
            ],
            "parameters": [
                {"name": "test parameter", "value": "test parameter value"},
                {"name": "test parameter 2", "value": "test paraeter value 2"}
            ],
            "counts": [
                {"name": "measurement", "value": {"00": 1024, "11": 0}}
            ],
            "entrypoint": None
        }

        request = self.factory.post("/api/v1/core/experiments/share/", json.dumps(post_data),
                                    content_type='application/json')
        view = ExperimentViewSet.as_view({'post': 'share'})
        force_authenticate(request, user=self.sample_user)
        response = view(request)

        self.assertEqual(response.status_code, 200)

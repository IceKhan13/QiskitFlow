import time
from django.contrib.auth.models import User

from core.models import (Experiment, Run, Metric,
                         Count, CountEntry, Parameter,
                         StateVector, ComplexNumber)


class RequestToModelAdapter:
    """ Adapter class for converting request json to Django model. """
    @classmethod
    def adapt_run_from_request(cls, request: dict, author: User) -> Run:
        experiment_name = request.get("name")
        experiment, created = Experiment.objects.get_or_create(name=experiment_name,
                                                               author=author)
        experiment.save()

        run_id = request.get("run_id")
        run = Run(run_id=run_id,
                  experiment=experiment,
                  description=request.get("description", ""),
                  timestamp=request.get("timestamp", int(time.time())))
        run.save()

        for sv in request.get("state_vectors", []):
            state_vector = StateVector(name=sv.get("name"), run=run)
            state_vector.save()

            for real, img in sv.get("vector", []):
                complex_number = ComplexNumber(real=real, img=img, state_vector=state_vector)
                complex_number.save()

        for m in request.get("metrics", []):
            metric = Metric(name=m.get("name"),
                            value=m.get("value"),
                            timestamp=m.get("timestamp"),
                            run=run)
            metric.save()

        for p in request.get("parameters", []):
            parameter = Parameter(name=p.get("name"),
                                  value=p.get("value"),
                                  timestamp=p.get("timestamp"),
                                  run=run)
            parameter.save()

        for c in request.get("counts", []):
            count = Count(name=c.get("name"), run=run)
            count.save()

            for k, v in c.get("value", {}).items():
                count_entry = CountEntry(key=k, value=v, count=count)
                count_entry.save()

        return run

import time
from django.contrib.auth.models import User

from core.models import Experiment, Run, Metric, Count, CountEntry, Parameter


class RequestToModelAdapter:
    """ Adapter class for converting request json to Django model. """
    @classmethod
    def adapt_run_from_request(cls, request: dict, author: User) -> Run:
        experiment_name = request.get("name")
        experiment, created = Experiment.objects.get_or_create(name=experiment_name,
                                                               author=author)
        experiment.save()

        run_id = request.get("run_id")
        run = Run(run_id=run_id, experiment=experiment, timestamp=request.get("timestamp", int(time.time())))
        run.save()

        for m in request.get("metrics", []):
            metric = Metric(name=m.get("name"),
                            value=m.get("value"),
                            timestamp=m.get("timestamp"),
                            run=run)
            metric.save()

        for p in request.get("paramters", []):
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

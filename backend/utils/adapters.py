from django.contrib.auth.models import User

from common.models import Experiment as ExperimentClass
from core.models import Experiment, Run, Metric, Count, CountEntry, Parameter


class ObjectToModelAdapter:
    """ General adapter class to convert lib objects to Django models. """
    @classmethod
    def run(cls, experiment_run: ExperimentClass, author: User) -> Experiment:
        experiment, created = Experiment.objects.get_or_create(name=experiment_run.name,
                                                               author=author)
        experiment.save()
        run = Run(uuid=experiment_run.run_id, experiment=experiment)
        run.save()

        for m in experiment_run.metrics:
            metric = Metric(name=m.name, value=m.value, run=run)
            metric.save()

        for p in experiment_run.parameters:
            parameter = Parameter(name=p.name, value=p.value, run=run)
            parameter.save()

        for m in experiment_run.measurements:
            measurement = Count(run=run)
            measurement.save()
            for entry_key, entry_value in m.value.items():
                entry = CountEntry(key=entry_key, value=entry_value, measurement=measurement)
                entry.save()

        return experiment

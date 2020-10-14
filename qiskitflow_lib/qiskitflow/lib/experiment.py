import uuid
import os
import json

from typing import Optional, Union
from qiskitflow.core.constants import EXPERIMENTS_DIRECTORY

class Metric:
    def __init__(self, name: str, value: Union[float, int]):
        """ Experiment metric.
        
        Args:
            name (str): name of metric
            value (float|int): value of metric
        """

        self.name = name
        self.value = value

    def __dict__(self):
        return {
            "name": self.name,
            "value": self.value
        }

    def __repr__(self):
        return "Metric({}:{})".format(self.name, self.value)


class Parameter:
    def __init__(self, name: str, value: Union[str, float, int]):
        """ Experiment parameter.
        
        Args:
            name (str): name of parameter
            value (float|int): value of parameter
        """
        self.name = name
        self.value = value

    def __dict__(self):
        return {
            "name": self.name,
            "value": self.value
        }

    def __repr__(self):
        return "Parameter({}:{})".format(self.name, self.value)


class Measurement:
    def __init__(self, name: str, value: dict):
        """ Experiment measurement.
        
        Args:
            name (str): name of measurement
            value (float|int): value of measurement
        """
        self.name = name
        self.value = value

    def __dict__(self):
        return {
            "name": self.name
        }

    def __repr__(self):
        return "Measurement({}: {})".format(self.name, self.value)


class Experiment:
    def __init__(self,
                 name: str, 
                 entrypoint: Optional[str] = None, 
                 base_path: Optional[str] = None):
        """ Experiment.
        
        Args:
            name (str): name of experiment
            entrypoint (str): script that were used to run this experiment
            base_path (str): path to folder with entrypoint a.k.a root directory for experiment
        """
        if not base_path:
            base_path = "./"
        self.base_path = base_path
        self.entrypoint = entrypoint

        self.name = name
        self.run_id = str(uuid.uuid4().hex)

        self.metrics = []
        self.parameters = []
        self.measurements = []

    def __enter__(self):
        return self

    def __exit__(self, type, value, traceback):
        self._save_experiment()

    def write_metric(self, metric_name: str, metric_value: Union[float, int]):
        """ Writes metric to experiment run. """
        self.metrics.append(Metric(metric_name, metric_value))

    def write_parameter(self, parameter_name: str, parameter_value: Union[str, float, int]):
        """ Writes parameter to experiment run. """
        self.parameters.append(Parameter(parameter_name, parameter_value))

    def write_measurement(self, name: str, measurement: dict):
        """ Writes measurement to experiment run. """
        self.measurements.append(Measurement(name, measurement))

    def set_run(self, run_id: str):
        """ Set run id for experiment. """
        self.run_id = run_id

    def _save_experiment(self):
        """ Saves experiment run. """
        run_dir = self._create_and_get_save_directory()
        with open("{}/run.json".format(run_dir), "w") as f:
            json.dump(self.__dict__(), f)
        return self.run_id

    def _create_and_get_save_directory(self) -> str:
        """ Creates directory for experiment run if not exists and return path. """
        directory = "{}/{}/{}/{}".format(self.base_path, EXPERIMENTS_DIRECTORY, self.name, self.run_id)
        if not os.path.exists(directory):
            os.makedirs(directory)
        else:
            raise Exception("Experiment run [{}] already exists for experiment [{}]".format(self.run_id, self.name))
        return directory

    def __dict__(self):
        return {
            "name": self.name,
            "run_id": self.run_id,
            "metrics": [m.__dict__() for m in self.metrics],
            "parameters": [p.__dict__() for p in self.parameters],
            "measurements": [m.__dict__() for m in self.measurements]
        }

    def __repr__(self):
        return 'Experiment {} (run: {})'.format(self.name, self.run_id)

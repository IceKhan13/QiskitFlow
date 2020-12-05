"""
Common python classes
TODO: delete and reuse components from PyPi package
"""
import uuid
import os
import json
import shutil

from typing import Optional, Union, Dict, List

EXPERIMENTS_DIRECTORY = "_experiments"


class Measurement:
    def __init__(self, name: str, value: Dict[str, int]):
        """ Experiment measurement.
        Args:
            name (str): name of measurement
            value (dict): value of measurement
        """
        self.name = name
        self.value = value

    def __dict__(self):
        return {
            "name": self.name,
            "value": self.value
        }

    def __eq__(self, other: 'Measurement'):
        return self.name == other.name and self.value == other.value

    def __repr__(self):
        return "Measurement({}: {})".format(self.name, self.value)


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

    def __eq__(self, other: 'Metric'):
        return self.name == other.name and self.value == other.value

    def __repr__(self):
        return "Metric({}:{})".format(self.name, self.value)


class Parameter:
    def __init__(self, name: str, value: Union[str, float, int]):
        """ Experiment parameter.
        Args:
            name (str): name of parameter
            value (float|int|str): value of parameter
        """
        self.name = name
        self.value = value

    def __dict__(self):
        return {
            "name": self.name,
            "value": self.value
        }

    def __eq__(self, other: 'Parameter'):
        return self.name == other.name and self.value == other.value

    def __repr__(self):
        return "Parameter({}:{})".format(self.name, self.value)


class Experiment:
    def __init__(self,
                 name: str,
                 entrypoint: Optional[str] = None,
                 save_path: Optional[str] = None):
        """ Experiment.

        Args:
            name (str): name of experiment
            entrypoint (str): script that were used to run this experiment
            save_path (str): experiments save location
        """
        if not save_path:
            save_path = "./"
        self.save_path = save_path
        self.entrypoint = entrypoint

        self.name = name
        self.run_id = str(uuid.uuid4().hex)

        self._metrics = []
        self._parameters = []
        self._measurements = []

    def __enter__(self):
        return self

    def __exit__(self, type, value, traceback):
        self._save_experiment()

    @property
    def metrics(self) -> List[Metric]:
        """ List of run metrics. """
        return self._metrics

    @property
    def parameters(self) -> List[Parameter]:
        """ List of run parameters. """
        return self._parameters

    @property
    def measurements(self) -> List[Measurement]:
        """ List of run measurements. """
        return self._measurements

    def write_metric(self, metric_name: str, metric_value: Union[float, int]):
        """ Writes metric to experiment run. """
        self._metrics.append(Metric(metric_name, metric_value))

    def write_parameter(self, parameter_name: str, parameter_value: Union[str, float, int]):
        """ Writes parameter to experiment run. """
        self._parameters.append(Parameter(parameter_name, parameter_value))

    def write_measurement(self, name: str, measurement: dict):
        """ Writes measurement to experiment run. """
        self._measurements.append(Measurement(name, measurement))

    def write_image(self, name: str, image_path: str):
        """ Writes image to experiment run. """
        # TODO: implement
        raise NotImplementedError("We are working on this!")

    def set_run(self, run_id: str):
        """ Set run id for experiment. """
        self.run_id = run_id

    def _save_experiment(self):
        """ Saves experiment run. """
        run_dir, sourcecode_directory = self._create_and_get_save_directory()

        # saving files
        # TODO: limit copytree to specific filetypes (.py, Docker, requirements.txt, etc)
        if self.entrypoint and os.path.isdir(self.save_path):
            shutil.copytree(self.save_path, sourcecode_directory,
                            ignore=shutil.ignore_patterns(EXPERIMENTS_DIRECTORY))

        with open("{}/run.json".format(run_dir), "w") as f:
            json.dump(self.__dict__(), f)
        return self.run_id

    @classmethod
    def load(cls, path: str):
        """ Load experiment run from file. """
        with open(path, "r") as f:
            run_data = json.load(f)
            return Experiment.load_from_dict(run_data)

    @classmethod
    def load_from_dict(cls, run_data: dict):
        exp = Experiment(run_data["name"], entrypoint=run_data["entrypoint"])
        exp.run_id = run_data["run_id"]

        metrics = []
        for m in run_data["metrics"]:
            metrics.append(Metric(m["name"], m["value"]))

        parameters = []
        for p in run_data["parameters"]:
            parameters.append(Parameter(p["name"], p["value"]))

        measurements = []
        for meas in run_data["counts"]:
            measurements.append(Measurement(meas["name"],
                                            meas["value"]))

        exp._metrics = metrics
        exp._parameters = parameters
        exp._measurements = measurements

        return exp

    def _create_and_get_save_directory(self) -> [str, str]:
        """ Creates directory for experiment run if not exists and return path. """
        directory = "{}/{}/{}/{}".format(self.save_path, EXPERIMENTS_DIRECTORY, self.name, self.run_id)
        sourcecode_directory = "{}/sourcecode".format(directory)
        if not os.path.exists(directory):
            os.makedirs(directory)
        else:
            raise Exception("Experiment run [{}] already exists for experiment [{}]".format(self.run_id, self.name))
        return directory, sourcecode_directory

    def __dict__(self):
        return {
            "name": self.name,
            "run_id": self.run_id,
            "metrics": [m.__dict__() for m in self._metrics],
            "parameters": [p.__dict__() for p in self._parameters],
            "measurements": [m.__dict__() for m in self._measurements],
            "entrypoint": self.entrypoint
        }

    def __repr__(self):
        return 'Experiment {} (run: {})'.format(self.name, self.run_id)

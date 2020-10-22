import uuid
import os
import json
import shutil

from typing import Optional, Union
from qiskitflow.core.constants import EXPERIMENTS_DIRECTORY
from qiskitflow.lib.models import Metric, Parameter, Measurement


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
        self.state_vectors = []  # TODO: implement

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
        if self.entrypoint and os.path.isdir(self.base_path):
            shutil.copytree(self.base_path, sourcecode_directory,
                            ignore=shutil.ignore_patterns(EXPERIMENTS_DIRECTORY))

        with open("{}/run.json".format(run_dir), "w") as f:
            json.dump(self.__dict__(), f)
        return self.run_id

    @classmethod
    def _load_experiment(cls, path: str):
        """ Load experiment run from file. """
        with open(path, "r") as f:
            run_data = json.load(f)
            exp = Experiment(run_data["name"], entrypoint=run_data["entrypoint"])
            
            metrics = []
            for m in run_data["metrics"]:
                metrics.append(Metric(m["name"], m["value"]))

            parameters = []
            for p in run_data["parameters"]:
                parameters.append(Parameter(p["name"], p["value"]))

            measurements = []
            for meas in run_data["measurements"]:
                measurements.append(Measurement(meas["name"],
                                                meas["value"]))

            exp.metrics = metrics
            exp.parameters = parameters
            exp.measurements = measurements

            # TODO: state vector
            return exp

    def _create_and_get_save_directory(self) -> [str, str]:
        """ Creates directory for experiment run if not exists and return path. """
        directory = "{}/{}/{}/{}".format(self.base_path, EXPERIMENTS_DIRECTORY, self.name, self.run_id)
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
            "metrics": [m.__dict__() for m in self.metrics],
            "parameters": [p.__dict__() for p in self.parameters],
            "measurements": [m.__dict__() for m in self.measurements],
            "entrypoint": self.entrypoint
        }

    def __repr__(self):
        return 'Experiment {} (run: {})'.format(self.name, self.run_id)

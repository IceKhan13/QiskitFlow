import sys
import uuid
import os
import math
import json
import shutil
import time

from typing import Optional, Union
from qiskitflow.utils.constants import EXPERIMENTS_DIRECTORY
from qiskitflow.lib.models import Metric, Parameter, Count, Artifact
from qiskitflow.utils.utils import include_patterns
from qiskitflow._version import __version__


class Experiment:
    def __init__(self,
                 name: str, 
                 entrypoint: Optional[str] = None,
                 sourcecode_dir: Optional[str] = None,
                 save_path: Optional[str] = None):
        """ Experiment.
        
        Args:
            name (str): name of experiment
            entrypoint (str): script that were used to run this experiment
            sourcecode_dir (str): path to directory with sourcecode and entrypoint
            save_path (str): experiments save location
        """
        if not save_path:
            save_path = "./"
        self.save_path = save_path
        self.entrypoint = entrypoint
        self.sourcecode_dir = sourcecode_dir

        self.name = name
        self.run_id = str(uuid.uuid4().hex)

        self.metrics = []
        self.parameters = []
        self.counts = []
        self.state_vectors = []  # TODO: implement

        self.artifacts = set()

        self.timestamp = int(time.time())

        self.version = __version__

        self.timestamp = int(time.time())

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

    def write_counts(self, name: str, counts: dict):
        """ Writes meas counts to experiment run. """
        self.counts.append(Count(name, counts))

    def write_image(self, name: str, image_path: str):
        """ Writes image to experiment run. """
        self.write_artifact(name, image_path)

    def write_artifact(self, name: str, path: str):
        """ Write artifact to experiment run. """
        self.artifacts.add(Artifact(name, path))

    def set_run(self, run_id: str):
        """ Set run id for experiment. """
        self.run_id = run_id

    def _save_experiment(self):
        """ Saves experiment run. """
        run_dir, sourcecode_directory = self._create_and_get_save_directory()

        # saving files
        if self.entrypoint and self.sourcecode_dir and os.path.isdir(self.sourcecode_dir):
            shutil.copytree(self.sourcecode_dir, sourcecode_directory,
                            ignore=include_patterns("*.py", "*.ipynb", "requirements.txt"))

        for art in self.artifacts:
            art.save(run_dir)

        with open("{}/run.json".format(run_dir), "w") as f:
            json.dump(self.__dict__(), f)
        return self.run_id

    @classmethod
    def load(cls, path: str):
        """ Load experiment run from file. """
        with open(path, "r") as f:
            run_data = json.load(f)
            exp = Experiment(run_data["name"], entrypoint=run_data["entrypoint"])

            version = run_data.get("version")
            exp.version = version

            run_id = run_data.get("run_id")
            exp.run_id = run_id

            metrics = []
            for m in run_data["metrics"]:
                metrics.append(Metric(m["name"], m["value"]))

            parameters = []
            for p in run_data["parameters"]:
                parameters.append(Parameter(p["name"], p["value"]))

            counts = []
            for cnt in run_data["counts"]:
                counts.append(Count(cnt["name"],
                                    cnt["value"]))

            artifacts = set()
            for art in run_data.get("artifacts", []):
                artifacts.add(Artifact(art.get("name"), art.get("path")))

            exp.metrics = metrics
            exp.parameters = parameters
            exp.counts = counts
            exp.artifacts = artifacts
            exp.timestamp = run_data.get("timestamp", exp.timestamp)

            # TODO: state vector
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
            "version": self.version,
            "name": self.name,
            "run_id": self.run_id,
            "metrics": [m.__dict__() for m in self.metrics],
            "parameters": [p.__dict__() for p in self.parameters],
            "counts": [c.__dict__() for c in self.counts],
            "artifacts": [a.__dict__() for a in self.artifacts],
            "entrypoint": self.entrypoint,
            "timestamp": self.timestamp
        }

    def __repr__(self):
        return 'Experiment {} (run: {})'.format(self.name, self.run_id)

    def get_metric(self, name: str) -> Union[float, int]:
        """ Returns metric value. """
        metrics = {m.name: m.value for m in self.metrics}
        return metrics.get(name, sys.maxsize)

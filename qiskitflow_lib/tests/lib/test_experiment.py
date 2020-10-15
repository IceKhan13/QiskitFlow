import unittest
import os
import json

from qiskitflow import Experiment
from qiskitflow.core.constants import EXPERIMENTS_DIRECTORY


class TestExperiment(unittest.TestCase):
    """ Experiment tests. """

    def setUp(self):
        self.resources_dir = "{}/tests/resources/".format(os.path.abspath(os.getcwd()))

    def test_experiment_saving(self):
        """ Base test for experiment save. """

        run_id = None

        with Experiment("test experiment",
                        entrypoint="entrypoint_example.py",
                        base_path=self.resources_dir) as exp:
            exp.write_metric("test metric", 0.1)
            exp.write_metric("test metric 2", 2)

            exp.write_parameter("test parameter", "test parameter value")
            exp.write_parameter("test parameter 2", "test paraeter value 2")

            exp.write_measurement("measurement", {"00": 1024, "11": 0})

            run_id = exp.run_id

        restored = Experiment._load_experiment("{}/{}/test experiment/{}/run.json".format(self.resources_dir,
                                                                                          EXPERIMENTS_DIRECTORY,
                                                                                          run_id))

        self.assertEqual(restored.name, exp.name)
        self.assertEqual(len(restored.metrics), len(exp.metrics))
        self.assertEqual(len(restored.parameters), len(exp.parameters))
        


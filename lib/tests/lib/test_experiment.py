import os
import unittest
import shutil

from qiskitflow import Experiment
from qiskitflow.utils.constants import EXPERIMENTS_DIRECTORY


class TestExperiment(unittest.TestCase):
    """ Experiment tests. """

    def setUp(self):
        self.resources_dir = "{}/../resources/".format(os.path.dirname(os.path.abspath(__file__)))

    def tearDown(self) -> None:
        test_experiments_location = "{}/{}".format(self.resources_dir, EXPERIMENTS_DIRECTORY)
        if os.path.exists(test_experiments_location):
            shutil.rmtree(test_experiments_location)

    def test_experiment_saving_and_loading(self):
        """ Base test for experiment save. """
        with Experiment("test experiment",
                        save_path=self.resources_dir) as exp:
            exp.write_metric("test metric", 0.1)
            exp.write_metric("test metric 2", 2)

            exp.write_parameter("test parameter", "test parameter value")
            exp.write_parameter("test parameter 2", "test paraeter value 2")

            exp.write_measurement("measurement", {"00": 1024, "11": 0})

            run_id = exp.run_id

        restored = Experiment.load("{}/{}/test experiment/{}/run.json".format(self.resources_dir,
                                                                              EXPERIMENTS_DIRECTORY,
                                                                              run_id))

        self.assertEqual(restored.name, exp.name)

        self.assertEqual(len(restored.metrics), len(exp.metrics))
        self.assertEqual(len(restored.parameters), len(exp.parameters))
        self.assertEqual(len(restored.measurements), len(exp.measurements))

        self.assertEqual(restored.metrics, exp.metrics)
        self.assertEqual(restored.parameters, exp.parameters)
        self.assertEqual(restored.measurements, exp.measurements)

    def test_sourcecode_save(self):
        """ Tests saving of sourecode files. """
        run_id = None

        with Experiment("test experiment",
                        entrypoint="entrypoint_example.py",
                        save_path=self.resources_dir) as exp:
            run_id = exp.run_id

        self.assertTrue(os.path.isfile("{}/../resources/{}/test experiment/{}/sourcecode/"
                                       "entrypoint_example.py".format(self.resources_dir,
                                                                      EXPERIMENTS_DIRECTORY,
                                                                      run_id)))

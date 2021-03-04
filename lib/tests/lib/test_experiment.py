import os
import unittest
import shutil
import numpy as np

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
        state_vector = np.random.random(10) + np.random.random(10) * 1j

        with Experiment("test experiment",
                        save_path=self.resources_dir) as exp:
            exp.write_metric("test metric", 0.1)
            exp.write_metric("test metric 2", 2)

            exp.write_parameter("test parameter", "test parameter value")
            exp.write_parameter("test parameter 2", "test paraeter value 2")
            exp.write_state_vector("test state vector", state_vector)

            exp.write_counts("counts", {"00": 1024, "11": 0})

            run_id = exp.run_id
            exp.set_description("test description")

        restored = Experiment.load("{}/{}/test experiment/{}/run.json".format(self.resources_dir,
                                                                              EXPERIMENTS_DIRECTORY,
                                                                              run_id))

        self.assertEqual(restored.name, exp.name)
        self.assertEqual(restored.description, exp.description)
        self.assertEqual(exp.description, "test description")

        self.assertEqual(len(restored.metrics), len(exp.metrics))
        self.assertEqual(len(restored.parameters), len(exp.parameters))
        self.assertEqual(len(restored.counts), len(exp.counts))
        self.assertEqual(len(restored.state_vectors), len(exp.state_vectors))

        self.assertEqual(restored.metrics, exp.metrics)
        self.assertEqual(restored.parameters, exp.parameters)
        self.assertEqual(restored.counts, exp.counts)
        self.assertTrue(np.array_equal(state_vector, restored.state_vectors[0].vector))

    def test_artifact_save(self):
        """ Tests saving artifacts. """
        run_id = None
        with Experiment("artifact saving experiment", save_path=self.resources_dir) as exp:
            exp.write_artifact("artifact", "{}/artifact.txt".format(self.resources_dir))
            run_id = exp.run_id

        self.assertTrue(os.path.isfile("{}/../resources/{}/artifact saving experiment/{}/"
                                       "artifact.txt".format(self.resources_dir,
                                                             EXPERIMENTS_DIRECTORY,
                                                             run_id)))

    def test_sourcecode_save(self):
        """ Tests saving of sourecode files. """
        run_id = None

        with Experiment("test experiment",
                        entrypoint="entrypoint_example.py",
                        save_path=self.resources_dir,
                        sourcecode_dir=self.resources_dir) as exp:
            run_id = exp.run_id

        self.assertTrue(os.path.isfile("{}/../resources/{}/test experiment/{}/sourcecode/"
                                       "entrypoint_example.py".format(self.resources_dir,
                                                                      EXPERIMENTS_DIRECTORY,
                                                                      run_id)))
        # should skip non pythonic files
        self.assertFalse(os.path.isfile("{}/../resources/{}/test experiment/{}/sourcecode/"
                                        "otherfile.txt".format(self.resources_dir,
                                                               EXPERIMENTS_DIRECTORY,
                                                               run_id)))

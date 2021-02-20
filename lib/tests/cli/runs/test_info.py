import unittest
from click.testing import CliRunner

from qiskitflow.cli.cli import run_detailed
from qiskitflow.lib.experiment import Experiment


class TestCLIExperimentInfo(unittest.TestCase):
    """ Tests CLI experiment info. """

    def setUp(self) -> None:
        self.runner = CliRunner()

    def test_experiment_info(self):
        """ Test experiments list. """
        with self.runner.isolated_filesystem():
            with Experiment("experiment") as exp:
                exp.run_id = "run_for_testing"
                exp.write_metric("metric", 1.)
                exp.write_metric("other metric", 2.)
                exp.write_parameter("parameter", "value")
                exp.write_parameter("other parameter", "other value")

            result = self.runner.invoke(run_detailed, ["run_for_testing"])

            self.assertEqual(result.exit_code, 0)
            for metric in exp.metrics:
                self.assertTrue(str(metric) in result.output)
            for param in exp.parameters:
                self.assertTrue(str(param) in result.output)


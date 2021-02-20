import unittest
from click.testing import CliRunner

from qiskitflow.cli.cli import runs_list
from qiskitflow.lib.experiment import Experiment


class TestCLIExperimentList(unittest.TestCase):
    """ Tests CLI experiments list. """

    def setUp(self) -> None:
        self.runner = CliRunner()

    def test_experiments_list(self):
        """ Test experiments list. """
        with self.runner.isolated_filesystem():
            for idx in range(5):
                with Experiment("{} experiment".format(idx)) as exp:
                    exp.write_metric("metric", idx * 1.)
                    exp.write_parameter("parameter", "value {}".format(idx))
            result = self.runner.invoke(runs_list)

            self.assertEqual(result.exit_code, 0)
            for idx in range(5):
                self.assertTrue("{} experiment".format(idx) in result.output)


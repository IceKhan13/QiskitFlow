import glob
import click
from tabulate import tabulate

from qiskitflow.utils.constants import EXPERIMENTS_DIRECTORY


def experiments_list():
    """ Paginated list of experiment runs

    Returns:
        list of experiments
    """
    experiment_runs_counter = {}
    for path in glob.glob("{}/**/**/run.json".format(EXPERIMENTS_DIRECTORY)):
        _, experiment_name, _, _ = path.split("/")
        if experiment_name not in experiment_runs_counter.keys():
            experiment_runs_counter[experiment_name] = 1
        else:
            experiment_runs_counter[experiment_name] += 1

    table = []
    for experiment_name, number_of_runs in experiment_runs_counter.items():
        table.append([experiment_name, number_of_runs])

    headers = ["Experiment", "# runs"]
    click.echo(click.style(tabulate(table, headers, tablefmt='grid'), fg='white'))


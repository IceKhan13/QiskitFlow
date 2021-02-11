import glob
import click
import os
from tabulate import tabulate

from qiskitflow.utils.constants import EXPERIMENTS_DIRECTORY, PAGINATION_SIZE


def experiments_list():
    """ Paginated list of experiment runs

    Returns:
        list of experiments
    """
    click.echo(click.style("Experiments list\n", fg='magenta'))

    experiments = glob.glob("{}/**/**/run.json".format(EXPERIMENTS_DIRECTORY))
    experiments.sort(key=os.path.getctime, reverse=True)

    experiment_runs = {}
    for path in experiments:
        _, experiment_name, _, _ = path.split("/")
        if experiment_name not in experiment_runs.keys():
            experiment_runs[experiment_name] = 1
        else:
            experiment_runs[experiment_name] += 1

    header = ["Name", "# of runs"]
    for i in range(0, len(experiment_runs), PAGINATION_SIZE):
        if i != 0:
            click.confirm("Next page?", abort=True)
        table = list(experiment_runs.items())[i: i + PAGINATION_SIZE]
        click.echo(click.style(tabulate(table, header, tablefmt='grid'), fg='white'))

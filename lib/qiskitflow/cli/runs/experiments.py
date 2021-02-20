import glob
import click
from tabulate import tabulate

from qiskitflow.utils.constants import EXPERIMENTS_DIRECTORY, PAGINATION_SIZE
from qiskitflow.lib.experiment import Experiment


def get_experiments():
    experiments = set()
    for path in glob.glob("{}/**/**/run.json".format(EXPERIMENTS_DIRECTORY)):
        experiment_name, _, _ = path.split("/")[-3:]
        experiments.add(experiment_name)
    experiments = [[e] for e in experiments]

    for i in range(0, len(experiments), PAGINATION_SIZE):
        if i != 0:
            click.confirm("Next page?", abort=True)
        table = experiments[i: i + PAGINATION_SIZE]
        click.echo(click.style(tabulate(table, ["Experiment"], tablefmt='grid'), fg='white'))
import glob
import click
import os
from tabulate import tabulate
from datetime import datetime

from qiskitflow.utils.constants import EXPERIMENTS_DIRECTORY, PAGINATION_SIZE
from qiskitflow.lib.experiment import Experiment


def _get_runs(search: str,
              experiment_name: str,
              order_by: str,
              order_type: str = "asc"):

    glob_query = "{}/**/**/run.json".format(EXPERIMENTS_DIRECTORY)
    if experiment_name:
        glob_query = "{}/{}/**/run.json".format(EXPERIMENTS_DIRECTORY, experiment_name)

    runs_paths = glob.glob(glob_query)

    # gather all runs and sort them accordingly
    runs = []
    for path in runs_paths:
        experiment = Experiment.load(path)
        if experiment_name and experiment_name != experiment.name:
            continue
        if search in experiment.run_id:
            ordering = experiment.get_metric(order_by) if order_by else os.path.getctime(path)
            runs.append({
                "order": int(ordering),
                "run": Experiment.load(path)
            })
    runs.sort(key=lambda x: x["order"], reverse=order_type == "desc")

    # collect rows to display
    rows = []
    for entry in runs:
        run = entry["run"]
        ps = [str(p) for p in run.parameters]
        ms = [str(m) for m in run.metrics]

        rows.append([datetime.fromtimestamp(run.timestamp),
                     "{}\n({})".format(run.name, run.run_id),
                     "\n".join(ms),
                     "\n".join(ps)])

    return rows


def runs(search: str,
         experiment: str,
         order_by: str,
         order_type: str = "asc") -> None:
    """ Show list of executed experiment runs based on parameters.

    Args:
        search (str): Search by run name
        experiment (str): Filter by experiment name
        order_by (str): Order by metric
        order_type (str): Order type
    """
    click.echo(click.style("Experiment runs\n", fg='magenta'))
    runs = _get_runs(search=search.strip(),
                     experiment_name=experiment.strip(),
                     order_by=order_by.strip(),
                     order_type=order_type.strip())
    headers = ["Date", "Name", "Metrics", "Parameters"]

    for i in range(0, len(runs), PAGINATION_SIZE):
        if i != 0:
            click.confirm("Next page?", abort=True)
        table = runs[i: i + PAGINATION_SIZE]
        click.echo(click.style(tabulate(table, headers, tablefmt='grid'), fg='white'))


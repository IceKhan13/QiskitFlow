import glob
import click
from tabulate import tabulate

from qiskitflow.utils.constants import EXPERIMENTS_DIRECTORY, PAGINATION_SIZE
from qiskitflow.lib.experiment import Experiment


def _get_header(metrics: str, parameters: str):
    """ Get header for table.

    Args:
        metrics (str): csv list of metrics to display
        parameters (str): csv list of parameters to display

    Returns:
        header (list): header of displayed table
    """
    if not metrics and not parameters:
        return ["Run ID", "Parameters", "Metrics"]

    return ["Run ID", ] + \
           ["P[{}]".format(p) for p in parameters.split(",")] + \
           ["M[{}]".format(m) for m in metrics.split(",")]


def _get_runs(name: str, metrics: str, parameters: str):
    """ Get run list.

    Args:
        name (str): name of experiment
        metrics (str): csv list of metrics to display
        parameters (str): csv list of parameters to display
        sort (str): sort by metric

    Returns:
        rows (list): list of rows for rendered table
    """

    runs = []
    for idx, path in enumerate(glob.glob("{}/{}/**/run.json".format(EXPERIMENTS_DIRECTORY, name))):
        _, _, run_id, _ = path.split("/")
        experiment = Experiment.load(path)

        if not metrics and not parameters:
            metrics = [str(m) for m in experiment.metrics]
            parameters = [str(p) for p in experiment.parameters]

            runs.append([run_id,
                         "\n".join(parameters),
                         "\n".join(metrics)])
        else:
            run = [run_id]

            for parameter in parameters.split(","):
                params_dict = {p.name: p.value for p in experiment.parameters}
                run.append(params_dict.get(parameter, ""))

            for metric in metrics.split(","):
                metrics_dict = {m.name: m.value for m in experiment.metrics}
                run.append(metrics_dict.get(metric, ""))

            runs.append(run)

    return runs


def experiment_info(name: str, metrics: str, parameters: str):
    """ Renders experiment information.

    Args:
        name (str): name of experiment
        metrics (str): csv list of metrics to display
        parameters (str): csv list of parameters to display
    """

    click.echo(click.style("Experiment [{}] runs\n".format(name), fg='magenta'))

    headers = _get_header(metrics, parameters)
    runs = _get_runs(name, metrics, parameters)

    for i in range(0, len(runs), PAGINATION_SIZE):
        if i != 0:
            click.confirm("Next page?", abort=True)
        table = runs[i: i + PAGINATION_SIZE]
        click.echo(click.style(tabulate(table, headers, tablefmt='grid'), fg='white'))


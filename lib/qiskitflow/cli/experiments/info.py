import glob
import click
import os
from tabulate import tabulate

from qiskitflow.utils.constants import EXPERIMENTS_DIRECTORY, PAGINATION_SIZE
from qiskitflow.lib.experiment import Experiment


def _get_header(metrics: str, parameters: str, counts: str):
    """ Get header for table.

    Args:
        metrics (str): csv list of metrics to display
        parameters (str): csv list of parameters to display
        counts (str): csv list of counts to display

    Returns:
        header (list): header of displayed table
    """
    if not metrics and not parameters and not counts:
        return ["Run ID", "Parameters", "Metrics", "Counts"]

    return ["Run ID", ] + \
           ["Parameter[{}]".format(p.strip()) for p in parameters.split(",")] + \
           ["Metric[{}]".format(m.strip()) for m in metrics.split(",")] + \
           ["Count[{}]".format(c.strip()) for c in counts.split(",")]


def _get_runs(name: str, metrics: str, parameters: str, counts: str, order_by: str, order_type: str):
    """ Get run list.

    Args:
        name (str): name of experiment
        metrics (str): csv list of metrics to display
        parameters (str): csv list of parameters to display
        counts (str): csv list of counts to display
        order_by (str): order by metric
        order_type (str): order type

    Returns:
        rows (list): list of rows for rendered table
    """

    runs = []

    runs_paths = glob.glob("{}/{}/**/run.json".format(EXPERIMENTS_DIRECTORY, name))

    # ordering
    for_ordering = []
    for path in runs_paths:
        experiment = Experiment.load(path)
        ordering = experiment.get_metric(order_by) if order_by else os.path.getctime(path)
        for_ordering.append({
            "order": int(ordering),
            "experiment": Experiment.load(path)
        })

    for_ordering.sort(key=lambda x: x["order"], reverse=order_type == "desc")

    for entry in for_ordering:
        experiment = entry["experiment"]
        run_id = experiment.run_id

        if not metrics and not parameters and not counts:
            ms = [str(m) for m in experiment.metrics]
            ps = [str(p) for p in experiment.parameters]
            cts = [str(c) for c in experiment.counts]

            runs.append([run_id,
                         "\n".join(ps),
                         "\n".join(ms),
                         "\n".join(cts)])
        else:
            run = [run_id]

            for parameter in parameters.split(","):
                params_dict = {p.name: p.value for p in experiment.parameters}
                run.append(params_dict.get(parameter.strip(), ""))

            for metric in metrics.split(","):
                metrics_dict = {m.name: m.value for m in experiment.metrics}
                run.append(metrics_dict.get(metric.strip(), ""))

            for count in counts.split(","):
                counts_dist = {c.name: c.value for c in experiment.counts}
                run.append(counts_dist.get(count.strip(), ""))

            runs.append(run)

    return runs


def experiment_info(name: str, metrics: str, parameters: str, counts: str, order_by: str, order_type: str):
    """ Renders experiment information.

    Args:
        name (str): name of experiment
        metrics (str): csv list of metrics to display
        parameters (str): csv list of parameters to display
        counts (str): csv list of counts to display
        order_by (str): order by specific metric
        order_type (str): order type
    """

    click.echo(click.style("Experiment [{}] runs\n".format(name), fg='magenta'))

    filter_display = {
        "Displayed metrics": metrics if metrics else "all",
        "Displayed parameters": parameters if parameters else "all",
        "Displayed counts": counts if counts else "all",
        "Order by metric": order_by if order_by else "NA",
        "Order direction": "desc" if order_type == "desc" else "asc"
    }

    for key, value in filter_display.items():
        click.echo(click.style("-- {}: {}".format(key, value), fg='white'))
    click.echo(click.style("", fg='white'))

    headers = _get_header(metrics, parameters, counts)
    runs = _get_runs(name, metrics, parameters, counts, order_by, order_type)

    for i in range(0, len(runs), PAGINATION_SIZE):
        if i != 0:
            click.confirm("Next page?", abort=True)
        table = runs[i: i + PAGINATION_SIZE]
        click.echo(click.style(tabulate(table, headers, tablefmt='grid'), fg='white'))


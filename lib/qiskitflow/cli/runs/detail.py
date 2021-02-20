import glob
import click
from tabulate import tabulate
from datetime import datetime

from qiskitflow.utils.constants import EXPERIMENTS_DIRECTORY, PAGINATION_SIZE
from qiskitflow.lib.experiment import Experiment


def detail(run_id: str) -> None:
    click.echo(click.style("Run [{}] detailed information.\n".format(run_id), fg='magenta'))

    glob_query = "{}/**/{}/run.json".format(EXPERIMENTS_DIRECTORY, run_id)
    results = glob.glob(glob_query)

    if len(results) == 0:
        click.echo(click.style("No data for experiment found =(\n"
                               "Check `qiskitflow runs`", fg="yellow"))

    for path in results:
        run = Experiment.load(path)

        ps = "\n".join(str(p) for p in run.parameters)
        ms = "\n".join(str(m) for m in run.metrics)
        cts = "\n".join(str(c) for c in run.counts)

        header = ["", "Values"]
        rows = [
            ["Run ID", run.run_id],
            ["Experiment", run.name],
            ["Date", datetime.fromtimestamp(run.timestamp)],
            ["Parameters", ps],
            ["Metrics", ms],
            ["Counts", cts]
        ]

        click.echo(click.style(tabulate(rows, header, tablefmt='grid'), fg='white'))

import click
import os

from qiskitflow.cli.runs.list import runs
from qiskitflow.cli.runs.experiments import get_experiments
from qiskitflow.cli.runs.detail import detail
from qiskitflow.cli.runs.share import share_experiment_run


@click.group(help="""
    Base QiskitFlow CLI function.
""")
def qiskitflow():
    click.echo(click.style("\nQiskitFlow. Reproducible quantum experiments.\n", fg='magenta'))


@qiskitflow.command("runs")
@click.option("--search", default="")
@click.option("--experiment", default="")
@click.option("--order_by", default="")
@click.option("--order_type", default="asc")
def runs_list(search, experiment, order_by, order_type):
    runs(search=search,
         experiment=experiment,
         order_by=order_by,
         order_type=order_type)


@qiskitflow.command("run")
@click.argument("run_id")
def run_detailed(run_id):
    detail(run_id)


@qiskitflow.command("experiments")
def experiments():
    get_experiments()


class HiddenPassword(object):
    def __init__(self, password=''):
        self.password = password

    def __str__(self):
        return '*' * len(self.password)


@qiskitflow.command("share")
@click.argument("run_id", type=str)
@click.option("--user",
              prompt=True,
              default=lambda: os.environ.get('QISKITFLOW_USER', ''))
@click.option('--password',
              prompt=True,
              default=lambda: HiddenPassword(os.environ.get('QISKITFLOW_PASSWORD', '')),
              hide_input=True)
@click.option("--host", default="http://localhost")
@click.option("--port", default="8000")
def share_run(run_id, user, password, host, port):
    share_experiment_run(run_id, user, password, host, port)

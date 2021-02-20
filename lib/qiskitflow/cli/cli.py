import click

from qiskitflow.cli.runs.list import runs
from qiskitflow.cli.runs.experiments import get_experiments
from qiskitflow.cli.runs.detail import detail


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

import click

from .experiments import (experiment_share as ex_share,
                          experiments_list as ex_list,
                          experiment_info as ex_info)


@click.group(help="""
    Base QiskitFlow CLI function.
""")
def qiskitflow():
    click.echo(click.style("\nQiskitFlow. Reproducible quantum experiments.\n", fg='magenta'))


@qiskitflow.group("experiments")
def experiments():
    pass


@experiments.command("info")
@click.argument("name")
@click.option("--metrics", default="")
@click.option("--parameters", default="")
def experiment_info(name, metrics, parameters):
    ex_info(name, metrics, parameters)


@experiments.command("list")
def experiments_list():
    ex_list()


@experiments.command("share")
@click.argument("experiment_name")
@click.argument("run_ids", nargs=-1)
def experiment_share(experiment_name, run_ids):
    ex_share(experiment_name, run_ids)
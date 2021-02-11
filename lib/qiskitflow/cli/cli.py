import click
import os

from .experiments import (experiment_share as ex_share,
                          experiments_list as ex_list,
                          experiment_info as ex_info)
from qiskitflow.utils.constants import (DEFAULT_HOST, DEFAULT_PORT)

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
@click.option("--counts", default="")
@click.option("--order_by", default="")
@click.option("--order_type", default="asc")
def experiment_info(name, metrics, parameters, counts, order_by, order_type):
    ex_info(name.strip(), metrics, parameters, counts, order_by.strip(), order_type.strip())


@experiments.command("list")
def experiments_list():
    ex_list()


# @experiments.command("share")
# @click.argument("experiment_name")
# @click.argument("run_ids", nargs=-1)
# @click.option('--username', prompt=True,
#               default=lambda: os.environ.get('QISKITFLOW_USER', ''))
# @click.option('--password', prompt=True, hide_input=True,
#               default=lambda: os.environ.get('QISKITFLOW_PASSWORD', ''))
# @click.option('--host', default=DEFAULT_HOST)
# @click.option('--port', default=DEFAULT_PORT)
# def experiment_share(experiment_name, run_ids, username, password, host, port):
#     ex_share(experiment_name, run_ids, username, password, host, port)

import click
import time
import glob
import json
import tarfile
import requests
import os
from shutil import copyfile
from tabulate import _table_formats, tabulate


from qiskitflow.core.utils import get_experiment_folder
from qiskitflow.core.constants import EXPERIMENTS_DIRECTORY


@click.group(help="""
    Base QiskitFlow cli function.
""")
def qiskitflow():
    click.echo(click.style("\nQiskitFlow. Reproducible quantum experiments.\n", fg='magenta'))


@qiskitflow.group("experiments")
def experiments():
    pass


@experiments.command("list")
def experiments_list():
    experiment_runs_counter = {}
    for path in glob.glob("{}/**/**/run.json".format(EXPERIMENTS_DIRECTORY)):
        _, experiment_name, run_id, _ = path.split("/")
        if experiment_name not in experiment_runs_counter.keys():
            experiment_runs_counter[experiment_name] = 1
        else:
            experiment_runs_counter[experiment_name] += 1

    table = []
    for experiment_name, number_of_runs in experiment_runs_counter.items():
        table.append([experiment_name, number_of_runs])

    headers = ["Experiment", "# runs"]
    click.echo(click.style(tabulate(table, headers, tablefmt='pretty'), fg='white'))


@experiments.command("info")
@click.argument("name")
def experiment_info(name):
    # TODO: information about docker images, etc...

    click.echo(click.style("Experiment [{}] runs\n".format(name), fg='magenta'))

    headers = ["Run ID", "Parameters", "Metrics"]
    table = []
    for path in glob.glob("{}/{}/**/run.json".format(EXPERIMENTS_DIRECTORY, name))[:100]:
        _, _, run_id, _ = path.split("/")
        
        metrics = []
        parameters = []

        # TODO: deserialize using Experiment object
        with open(path, "r") as f:
            data = json.load(f)
            for metric in data["metrics"]:
                metrics.append("{}: {}".format(metric["name"], metric["value"]))
            for param in data["parameters"]:
                parameters.append("{}: {}".format(param["name"], param["value"]))

        table.append([run_id,
                      "\n".join(parameters),
                      "\n".join(metrics)])
    
    click.echo(click.style(tabulate(table, headers, tablefmt='pretty'), fg='white'))


@experiments.command("share")
@click.argument("name")
def experiment_share(name):
    click.echo(click.style("Sharing experiment '{}'...\n".format(name), fg='magenta'))
    # TODO: implement

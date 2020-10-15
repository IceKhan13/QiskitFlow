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
        _, experiment_name, _, _ = path.split("/")
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


def run_upload(experiment_name, run_id):
    folder = "{}/{}/{}".format(EXPERIMENTS_DIRECTORY, experiment_name, run_id)
    sourcecode_dir = "{}/sourcecode".format(folder)

    current_dir = os.path.abspath(os.getcwd())
    if os.path.isdir(sourcecode_dir):
        os.chdir(folder)
        with tarfile.open("sourcecode.tar.gz", "w:gz") as tar:
            tar.add("sourcecode")
    os.chdir(current_dir)
    
    with open("{}/run.json".format(folder), "r") as f:
        payload = json.load(f)

        # TODO: send payload and sourcecode to server
        click.echo(payload)

    click.echo(click.style("Experiment [{}] run [{}] has been shared " \
                           "successfully!\n".format(experiment_name, run_id), fg='white'))



@experiments.command("share")
@click.argument("experiment_name")
@click.argument("run_ids", nargs=-1)
def experiment_share(experiment_name, run_ids):
    if len(run_ids) == 0:
        runs = []
        for path in glob.glob("{}/{}/**/run.json".format(EXPERIMENTS_DIRECTORY, experiment_name)):
            _, _, run_id, _ = path.split("/")
            runs.append(run_id)

        if click.confirm("Do you want to share all {} runs of " \
                         "experiment {}?".format(len(runs), experiment_name)):
            # TODO: think about batch upload
            for run_id in runs:
                run_upload(experiment_name, run_id)
        else:
            click.echo(click.style("Cancelling sharing...\n", fg='yellow'))

    else:
        for run_id in run_ids:
            run_upload(experiment_name, run_id)


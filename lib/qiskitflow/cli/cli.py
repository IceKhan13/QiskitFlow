import click
import time
import glob
import json
import tarfile
import requests
import os
from shutil import copyfile

_FOLDER = "_experiments"

@click.group(help="""
    Base QiskitFlow cli function.
""")
def qiskitflow():
    click.echo(click.style("== QiskitFlow. Reproducible quantum experiments ==", fg='magenta'))


@qiskitflow.command("run")
@click.argument("filename")
def run(filename):
    click.echo(click.style("Runnning...", fg='magenta'))
    exec(open(filename).read())
    click.echo(click.style("Success!", fg='magenta'))


@qiskitflow.command("share")
@click.argument("name")
def share(name):
    click.echo(click.style("Sharing experiment '{}'".format(name), fg='magenta'))

    runs = []
    for path in glob.glob("{}/{}/**/run.json".format(_FOLDER, name)):
        with open(path, "r") as f:
            runs.append(json.load(f)["run"])

    experiment_file_location = "{}/{}/experiment.json".format(_FOLDER, name)
    
    with open(experiment_file_location, "w") as f:
        json.dump({
            "name": name,
            "runs": runs
        }, f)

    tar_file_location = "{}/{}/experiment.tar.gz".format(_FOLDER, name)
    tar = tarfile.open(tar_file_location, "w:gz")
    for f in [experiment_file_location]:
        copyfile(f, "experiment.json")
        tar.add("experiment.json")
        os.remove("experiment.json")
    tar.close()

    files = {'archive': open(tar_file_location,'rb')}
    values = {}
    response = requests.post("http://localhost:8000/experiments/upload/", files=files, data=values).text

    time.sleep(0.3)
    click.echo(click.style("Success!", fg='magenta'))


@qiskitflow.command("get")
@click.argument("name")
def get(name):
    click.echo(click.style("Getting experiment '{}'".format(name), fg='magenta'))
    time.sleep(0.3)
    click.echo(click.style("Success!", fg='magenta'))


@qiskitflow.command("list")
def list():
    click.echo(click.style("Local experiment runs:", fg='magenta'))
    for path in glob.glob("{}/**/**/run.json".format(_FOLDER)):
        _, experiment, run_id, _ = path.split("/")
        click.echo(click.style("- {} | {}".format(experiment, run_id), fg='white'))

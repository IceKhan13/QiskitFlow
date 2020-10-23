import glob
import json
import os
import tarfile
import click

from qiskitflow.utils.constants import EXPERIMENTS_DIRECTORY


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


def experiment_share(experiment_name, run_ids):
    raise NotImplementedError("Method is not implemented yet. We are working on this!")

    # if len(run_ids) == 0:
    #     runs = []
    #     for path in glob.glob("{}/{}/**/run.json".format(EXPERIMENTS_DIRECTORY, experiment_name)):
    #         _, _, run_id, _ = path.split("/")
    #         runs.append(run_id)
    #
    #     if click.confirm("Do you want to share all {} runs of " \
    #                      "experiment {}?".format(len(runs), experiment_name)):
    #         # TODO: think about batch upload
    #         for run_id in runs:
    #             run_upload(experiment_name, run_id)
    #     else:
    #         click.echo(click.style("Cancelling sharing...\n", fg='yellow'))
    #
    # else:
    #     for run_id in run_ids:
    #         run_upload(experiment_name, run_id)

import glob
import json
import os
import tarfile
import click
import requests

from qiskitflow.utils.constants import EXPERIMENTS_DIRECTORY


def run_upload(experiment_name: str, run_id: str,
               username: str, passowrd: str,
               host: str, port: int) -> None:
    """ Uploads single run of experiment.

    Args:
        experiment_name (str): name of experiment
        run_id (str): id of run
        username (str): username
        passowrd (str): password
        port (int): port of server
        host (str): host of server
    """

    folder = "{}/{}/{}".format(EXPERIMENTS_DIRECTORY, experiment_name, run_id)
    sourcecode_dir = "{}/sourcecode".format(folder)

    current_dir = os.path.abspath(os.getcwd())
    if os.path.isdir(sourcecode_dir):
        os.chdir(folder)
        with tarfile.open("sourcecode.tar.gz", "w:gz") as tar:
            tar.add("sourcecode")
    os.chdir(current_dir)

    try:
        with open("{}/run.json".format(folder), "r") as f:
            payload = json.load(f)

            # authentication
            auth_url = "{host}:{port}/api/token/".format(host=host, port=port)
            auth_response = requests.post(auth_url, json={
                "username": username,
                "password": passowrd
            })

            # sharing
            if auth_response.status_code != 200:
                click.echo(click.style("Invalid username or passowrd.", fg='yellow'))
            else:
                token = json.loads(auth_response.text)["access"]

                # TODO: send sourcecode to server
                share_url = "{host}:{port}/api/v1/core/experiments/share/".format(host=host, port=port)
                share_response = requests.post(share_url, json=payload, headers={
                    "Authorization": "Bearer {token}".format(token=token)
                })
                if share_response.status_code == 200:
                    click.echo(click.style("Experiment [{}] run [{}] has been shared "
                                           "successfully!\n".format(experiment_name, run_id), fg='white'))
                else:
                    click.echo(click.style("Server responded with {code}: {msg}".format(code=share_response.status_code,
                                                                                        msg=share_response.text),
                                           fg='yellow'))

    except FileNotFoundError:
        msg = "No files associated with {experiment} {run_id}".format(experiment=experiment_name,
                                                                      run_id=run_id)
        click.echo(click.style(msg, fg='yellow'))
    except Exception as e:
        msg = "Unknown error: {error}".format(error=e)
        click.echo(click.style(msg, fg='yellow'))


def experiment_share(experiment_name, run_ids, username, password, host, port):
    """ Entrypoint for experiments sharing

    Args:
        experiment_name (str): name of experiment
        run_ids (str): id of run
        username (str): username
        password (str): user password
        host (str): host for server
        port (int): port for server
    """
    if len(run_ids) == 0:
        runs = []
        for path in glob.glob("{}/{}/**/run.json".format(EXPERIMENTS_DIRECTORY, experiment_name)):
            _, _, run_id, _ = path.split("/")
            runs.append(run_id)

        click.echo(click.style("Please, specify run ids of experiment", fg='yellow'))
        suffix = "..." if len(runs) > 5 else ""
        msg = "Runs: {runs}{suffix}\n".format(runs=",".join([str(r) for r in runs]), suffix=suffix)
        click.echo(click.style(msg, fg='yellow'))

        # if click.confirm("Do you want to share all {} runs of " \
        #                  "experiment {}?".format(len(runs), experiment_name)):
        #     # TODO: think about batch upload
        #     for run_id in runs:
        #         run_upload(experiment_name, run_id)
        # else:
        #     click.echo(click.style("Cancelling sharing...\n", fg='yellow'))
    else:
        for run_id in run_ids:
            run_upload(experiment_name, run_id, username, password, host, port)

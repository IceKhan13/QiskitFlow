import glob
import click
import json
from tabulate import tabulate
from datetime import datetime
from typing import Union
import requests

from qiskitflow.utils.constants import EXPERIMENTS_DIRECTORY, PAGINATION_SIZE
from qiskitflow.lib.experiment import Experiment


def _get_token(user, password, host, port):
    """ Gets auth token. """
    token_url = "{}:{}/api/token/".format(host, port)
    response = requests.post(token_url, json={
        "username": user,
        "password": password
    })
    if response.ok:
        return json.loads(response.text).get("access")
    else:
        return ""


def share_experiment_run(run_id: str,
                         user: str,
                         password: str,
                         host: str,
                         port: Union[str, int]):
    """ Shares experiment run to specified backend. """
    try:
        glob_query = "{}/**/{}/run.json".format(EXPERIMENTS_DIRECTORY, run_id)
        for path in glob.glob(glob_query):
            click.echo(click.style("Sharing run [{}]".format(run_id), fg="white"))
            with open(path, "r") as f:
                data = json.load(f)
                share_url = "{}:{}/api/v1/core/runs/share/".format(host, port)
                token = _get_token(user, password, host, port)
                response = requests.post(share_url, json=data, headers={'Authorization': 'Bearer {}'.format(token)})
                if response.ok:
                    click.echo(click.style("Run was successfully shared!", fg="magenta"))
                elif response.status_code == 401:
                    click.echo(click.style("Invalid login or password.", fg="yellow"))
                else:
                    click.echo(click.style("Something went wrong during "
                                           "experiment sharing: \n{}".format(response.text), fg="yellow"))
    except Exception as e:
        click.echo(click.style("Something went wrong during experiment sharing: \n{}".format(e), fg="yellow"))

import click
import time


@click.group(help="""
    Base QiskitFlow cli function.
""")
def qiskitflow():
    pass
    #click.echo(click.style("== QiskitFlow. Reproducible quantum experiments ==", fg='magenta'))


@qiskitflow.command("run")
@click.argument("name")
def run(name):
    click.echo(click.style("Runnning experiment '{}'".format(name), fg='magenta'))
    time.sleep(0.1)
    click.echo(click.style("Success!", fg='magenta'))


@qiskitflow.command("share")
@click.argument("name")
def share(name):
    click.echo(click.style("Sharing experiment '{}'".format(name), fg='magenta'))
    time.sleep(0.1)
    click.echo(click.style("Success!", fg='magenta'))


@qiskitflow.command("get")
@click.argument("name")
def get(name):
    click.echo(click.style("Getting experiment '{}'".format(name), fg='magenta'))
    time.sleep(0.1)
    click.echo(click.style("Success!", fg='magenta'))

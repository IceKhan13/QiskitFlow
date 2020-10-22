from .constants import EXPERIMENTS_DIRECTORY


def get_experiment_folder(name: str) -> str:
    return "{}/{}".format(EXPERIMENTS_DIRECTORY, name)

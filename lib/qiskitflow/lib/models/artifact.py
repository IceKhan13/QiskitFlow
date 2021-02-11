import time
import shutil
import logging


class Artifact:
    def __init__(self, name: str, path: str):
        """ Artifact for experiment.

        Args:
            name (str): name of artifact
            path (str): path to artifact
        """
        self.name = name
        self.path = path

        self.timestamp = int(time.time())

    def save(self, dst: str):
        """ Save artifact to destination folder. """
        try:
            shutil.copy(self.path, dst)
        except Exception as e:
            logging.warning("Error occurred during saving artifact: {}".format(e))

    def __hash__(self):
        return hash("{}:{}".format(self.name, self.path))

    def __dict__(self):
        return {
            "name": self.name,
            "path": self.path,
            "timestamp": self.timestamp
        }

    def __eq__(self, other):
        return self.name == other.name and self.path == other.path

    def __repr__(self):
        return "Artifact({}: {}...)".format(self.name, self.path[:10])

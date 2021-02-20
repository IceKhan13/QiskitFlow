from typing import Dict

import time


class Count:
    def __init__(self, name: str, value: Dict[str, int]):
        """ Experiment measurement.

        Args:
            name (str): name of measurement
            value (dict): value of measurement
        """
        self.name = name
        self.value = value
        self.timestamp = int(time.time())

    def __dict__(self):
        return {
            "name": self.name,
            "value": self.value
        }

    def __eq__(self, other: 'Counts'):
        return self.name == other.name and self.value == other.value

    def __repr__(self):
        values = "\n".join("- {} -> {}".format(k, v) for k, v in self.value.items())
        return "{}:\n{}".format(self.name, values)
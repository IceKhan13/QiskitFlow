from typing import Union

import time


class Parameter:
    def __init__(self, name: str, value: Union[str, float, int]):
        """ Experiment parameter.

        Args:
            name (str): name of parameter
            value (float|int|str): value of parameter
        """
        self.name = name
        self.value = value
        self.timestamp = int(time.time())

    def __dict__(self):
        return {
            "name": self.name,
            "value": self.value,
            "timestamp": self.timestamp
        }

    def __eq__(self, other: 'Parameter'):
        return self.name == other.name and self.value == other.value

    def __repr__(self):
        return "{}:{}".format(self.name, self.value)

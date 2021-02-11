from typing import Union

import time


class Metric:
    def __init__(self, name: str, value: Union[float, int]):
        """ Experiment metric.

        Args:
            name (str): name of metric
            value (float|int): value of metric
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

    def __eq__(self, other: 'Metric'):
        return self.name == other.name and self.value == other.value

    def __repr__(self):
        return "{}:{}".format(self.name, self.value)



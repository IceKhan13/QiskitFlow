from typing import Union


class Metric:
    def __init__(self, name: str, value: Union[float, int]):
        """ Experiment metric.

        Args:
            name (str): name of metric
            value (float|int): value of metric
        """

        self.name = name
        self.value = value

    def __dict__(self):
        return {
            "name": self.name,
            "value": self.value
        }

    def __eq__(self, other: 'Metric'):
        return self.name == other.name and self.value == other.value

    def __repr__(self):
        return "Metric({}:{})".format(self.name, self.value)



from typing import Union


class Parameter:
    def __init__(self, name: str, value: Union[str, float, int]):
        """ Experiment parameter.

        Args:
            name (str): name of parameter
            value (float|int|str): value of parameter
        """
        self.name = name
        self.value = value

    def __dict__(self):
        return {
            "name": self.name,
            "value": self.value
        }

    def __eq__(self, other: 'Parameter'):
        return self.name == other.name and self.value == other.value

    def __repr__(self):
        return "Parameter({}:{})".format(self.name, self.value)

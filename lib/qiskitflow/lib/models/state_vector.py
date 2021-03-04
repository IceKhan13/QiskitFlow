import numpy as np


class StateVector:
    def __init__(self, name: str, vector: np.ndarray):
        """ State vector model.

        Args:
            name (str): name of state vector
            vector (numpy ndarray): array of complex number representing state vector
        """
        self.name = name
        self.vector = vector

    def __dict__(self):
        real = self.vector.real.tolist()
        img = self.vector.imag.tolist()
        if len(real) != len(img):
            img = [0.] * len(real)

        return {
            "name": self.name,
            "vector": [[r, i] for r, i in zip(real, img)]
        }

    def __eq__(self, other):
        return self.name == other.name and self.vector == other.vector

    def __repr__(self):
        return "StateVector({}: {})".format(self.name, self.vector)
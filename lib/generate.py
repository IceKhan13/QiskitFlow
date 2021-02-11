from qiskitflow import Experiment
import time
import random


def generate():
    for idx in range(30):
        time.sleep(0.1)

        with Experiment(f"Experiment #{idx}") as exp:

            for metric_index in range(10):
                exp.write_metric(f"metric #{metric_index}", random.randint(0, 400))

            for parameter_index in range(3):
                exp.write_parameter(f"parameter #{parameter_index}", f"param {parameter_index}")

            exp.write_counts("counts", {"0000": 1024, "1111": 1024})


if __name__ == '__main__':
    generate()

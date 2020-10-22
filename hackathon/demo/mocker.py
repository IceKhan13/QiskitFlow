from qiskitflow.lib.experiment import Experiment
import random
import os


for name in ["entanglement", "simple_circuit_experiment", "qml_experiment", "quantum_ensembling"]:
    for i in range(5):
        experiment = Experiment(name)

        experiment.write_measurement({
            "0000": random.randint(0, 1024),
            "0001": random.randint(0, 1024),
            "0010": random.randint(0, 1024),
            "0011": random.randint(0, 1024)
        })
        experiment.write_measurement({
            "0000": random.randint(0, 1024),
            "0001": random.randint(0, 1024),
            "0010": random.randint(0, 1024),
            "0011": random.randint(0, 1024)
        })
        experiment.write_measurement({
            "0000": random.randint(0, 1024),
            "0001": random.randint(0, 1024),
            "0010": random.randint(0, 1024),
            "0011": random.randint(0, 1024)
        })

        experiment.write_metric("t0", 0.1)
        experiment.write_metric("execution time", 10)

        experiment.write_parameter("backend", "Tashkent")
        experiment.write_parameter("name", name)

        experiment.save_exoeriment()

    os.system("qiskitflow share {}".format(name))




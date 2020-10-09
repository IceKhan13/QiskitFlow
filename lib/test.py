from qiskitflow.lib.experiment import Experiment


experiment = Experiment("some name")

experiment.write_measurement({"00": 1024})
experiment.write_measurement({"01": 1024})


experiment.write_metric("t0", 0.1)

experiment.write_parameter("backend", "Tashkent")


experiment.save_exoeriment()
import uuid
import os
import json


class Experiment(object):
    """
    _experiments/
        awsome_experiment/
            12873912873981273/
                json_dump.json
            123213213asdasd/
                json_dump.json
            asdagdgdsgsdfsdf/
                json_dump.json
        awsome_experiment_2/
            12873912873981273/
                json_dump.json
            123213213asdasd/
                json_dump.json
            asdagdgdsgsdfsdf/
                json_dump.json   


        {
            'name': 'quantum experiment name example', 
            'runs': [
                {
                    'id': '123123123', 
                    'parameters': [
                        {'name': 't0', 'value': 0.1},
                        {'name': 't0', 'value': 0.1}
                    ], 
                    'metrics': [
                        {'name': 'f1_score', 'value': 0.8},
                        {'name': 'f1_score', 'value': 0.8}
                    ], 
                    'measurements': [
                        {'00': 475, '11': 525},
                        {'00': 475, '11': 525},
                        {'00': 475, '11': 525},
                        {'00': 475, '11': 525}
                    ], 
                    'result': {'any': 'json_here'}
                }
            ]}
    """

    _ROOT_FOLDER = "_experiments"

    def __init__(self, name):
        self.name = name
        self.experiment_folder = "{}/{}".format(self._ROOT_FOLDER, self.name)

        if not os.path.exists(self.experiment_folder):
            os.makedirs(self.experiment_folder)

        self.metrics = []
        self.parameters = []
        self.measurements = []

        self.uuid = str(uuid.uuid4().hex)

    def write_metric(self, metric_name, metric_value):
        self.metrics.append({
            "name": metric_name,
            "value": metric_value
        })

    def write_parameter(self, parameter_name, parameter_value):
        self.parameters.append({
            "name": parameter_name,
            "value": parameter_value
        })

    def write_measurement(self, measurement):
        self.measurements.append(measurement)

    def save_exoeriment(self):
        run_folder = "{}/{}".format(self.experiment_folder, self.uuid)
        os.makedirs(run_folder)

        with open("{}/run.json".format(run_folder), "w") as f:
            json.dump({
                "experiment": self.name,
                "run": {
                    "id": self.uuid,
                    "metrics": self.metrics,
                    "parameters": self.parameters,
                    "measurements": self.measurements
                }
            }, f)

    def __repr__(self):
        return 'Experiment({})'.format(self.name)

import uuid



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
    """

    def __init__(self,
                 name: str):
        self.name = name

    def write_metric(self, metric_name, metric_value):
        # TODO: implement
        pass

    def write_parameter(self, parameter_name, parameter_value):
        # TODO: implement
        pass

    def write_measurement(self, measurement_name, measurement):
        # TODO: implement
        pass

    def write_result(self, result):
        # TODO: implement
        pass

    def save_exoeriment(self):
        pass

    def __repr__(self):
        return 'Experiment({})'.format(self.name)

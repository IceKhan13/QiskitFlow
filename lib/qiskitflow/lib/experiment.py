import uuid


class Experiment(object):
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

    def __repr__(self):
        return 'Experiment({})'.format(self.name)

from qiskitflow.lib.experiment import Experiment


def run():

    with Experiment("LEL") as exp:
        exp.write_metric("lel", 0.1)
        exp.write_metric("lel2", 0.2)
        exp.write_metric("lel3", 0.3)
        exp.write_metric("lel4", 0.4)

        exp.write_parameter("asdasd", "asdasd")
        exp.write_parameter("asdasd123", "asdasd")
        exp.write_parameter("asdasd1232", "asdasd")
        exp.write_parameter("asdasd123123", "asdasd")







if __name__ == "__main__":
    run()
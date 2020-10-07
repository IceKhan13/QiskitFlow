import math
import datetime

import qiskitflow

from qiskit import QuantumRegister, ClassicalRegister, QuantumCircuit


def my_quantum_program(experiment_name: str = "Awesome experiment",
                       seed: int = 42):
    """
    Awesome docs here
    """
    qf = qiskitflow.Experiment(experiment_name)

    start = datetime.datetime.now()

    # do some quantum coding here
    qreg_q = QuantumRegister(5, 'q')
    creg_c = ClassicalRegister(5, 'c')
    circuit = QuantumCircuit(qreg_q, creg_c)

    circuit.u3(3.141592653589793, 1.5707963267948966, 4.71238898038469, qreg_q[0])
    quantum_circuit_execution_result = circuit.measure(qreg_q[0], creg_c[0])

    end = datetime.datetime.now()

    execution_time = end - start

    qf.write_metric("execution time", execution_time)
    qf.write_parameter("somehting important", "YEAH!")

    qf.write_parameter("t1", 42)
    qf.write_parameter("version of calbiration of almaden backend", 0.0.1)

    qf.write_measurement("intermediate measurement", quantum_circuit_execution_result)

    qf.write_result({
        "something here to write as results": "great!"
    })
    

if __name__ == "__main__":
    my_quantum_program()
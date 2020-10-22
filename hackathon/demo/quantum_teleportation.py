
import qiskit
import numpy as np
from math import sqrt,pi
from qiskit import *
from qiskit.visualization import *
from qiskit.extensions import Initialize
from qiskit.quantum_info import *
import time
from qiskit.tools.monitor import job_monitor
from qiskit.ignis.verification.tomography import *
 
import math
import datetime

from qiskitflow.lib.experiment import Experiment


def quantum_teleporation_experiment():

    experiment = Experiment("quantum_teleportation")


    qc = QuantumCircuit(1) # Create a quantum circuit with one qubit
    psi = [1/sqrt(2),1/sqrt(2)]   # Define initial_state in a superposition state
    initial_state =Initialize(psi)
    qc.append(initial_state, [0]) # Apply initialisation operation to the 0th qubit
    result = execute(qc, Aer.get_backend('statevector_simulator')).result() # Do the simulation, returning the result
    exp_state = result.get_statevector(qc)

    qr = QuantumRegister(3)
    cr = ClassicalRegister(1)
    circuit = QuantumCircuit(qr,cr)

    circuit.append(initial_state,[0])
    circuit.barrier()

    circuit.h(qr[1])
    circuit.cx(qr[1],qr[2])
    circuit.barrier()


    circuit.cx(qr[0],qr[1])
    circuit.h(qr[0])
    circuit.barrier()

    circuit.cz(qr[0],qr[2])
    circuit.cx(qr[1],qr[2])


    circuit.measure(qr[2],cr)

    t = time.time()

    backend = Aer.get_backend('qasm_simulator')
    job_circuit= execute(circuit, backend=backend, shots=4096)
    device_counts = job_circuit.result().get_counts(circuit)

    experiment.write_measurement(device_counts)
    

    qc = QuantumRegister(3)
    circuit = QuantumCircuit(qc)

    circuit.append(initial_state,[0])
    circuit.barrier()

    circuit.h(qc[1])
    circuit.cx(qc[1],qc[2])
    circuit.barrier()


    circuit.cx(qc[0],qc[1])
    circuit.h(qc[0])
    circuit.barrier()

    circuit.cz(qc[0],qc[2])
    circuit.cx(qc[1],qc[2])

    t = time.time()

    qst_circuit = state_tomography_circuits(circuit,qc[2])
    job_circuit = execute(qst_circuit, backend=backend, shots=4096)


    tomo_circuit = StateTomographyFitter(job_circuit.result(),qst_circuit)
    tomo_circuit.data

    rho_circuit = tomo_circuit.fit()

    F_state = state_fidelity(exp_state,rho_circuit)

    pur = purity(rho_circuit)
    
    experiment.write_metric("purity", float(pur))
    experiment.write_metric("fit_fidelity_state", float(F_state))
    experiment.write_metric("execution time", int(time.time() - t))

    experiment.write_parameter("backend", "qasm_simulator")
    experiment.write_parameter("number of shots", 4096)
    experiment.write_parameter("job id", str(job_circuit.job_id()))

    experiment.save_exoeriment()

    print("WOOHOO!") # that exact feeling when your code is working


if __name__ == "__main__":
    quantum_teleporation_experiment()
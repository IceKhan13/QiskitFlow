QiskitFlow library
==================

### Hot to run
* [Overview / Flow](#flow)
* [Installation](#installation)
* [Code annotation](#code-annotation)
* [CLI](#cli)
  * [Experiments list](#list-of-experiments)
  * [Experiment information](#experiment-information-runs)
* [Examples](#examples)

### Flow

![flow](../docs/images/flow.png)

Flow of actions while using QiskitFlow is following:
- [Install](#installation) QiskitFlow if not installed yet
- [Annotate](#code-annotation) your code with `Experiment` abstraction QiskitFlow library provides
- Run your code as usual: QiskitFlow will write metadata of your experiment execution in local folder 
- You can review experiments using [CLI interface](#cli)

> We are tracking metrics, parameters, artifacts and measurements of experiments. 
> Artifacts, circuits, sourcecode and other useful things are on their way.

> Note: qiskitflow creates `_experiments` folder in place of execution of code, where all serialized information is stored in json format, so it's easy to track it even in git 


### Installation

```shell script
pip install qiskitflow
```


### Code annotation

Library for quantum programs annotation

Sample example of annotation:
```python
from qiskitflow import Experiment

with Experiment("awesome_experiment") as experiment:

    # your quantum program here!
    
    experiment.write_metric("test metric", 0.1)
    experiment.write_metric("test metric 2", 2)

    experiment.write_parameter("test parameter", "test parameter value")
    experiment.write_parameter("test parameter 2", "test paraeter value 2")

    experiment.write_counts("measurement", {"00": 1024, "11": 0})
```

<details><summary>Full example with quantum teleportation</summary>
<p>

```python
import numpy as np
import time
from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister, execute, BasicAer, IBMQ
from qiskit.visualization import plot_histogram, plot_bloch_multivector
from qiskit.extensions import Initialize
from qiskit_textbook.tools import random_state, array_to_latex

from qiskitflow import Experiment

with Experiment("quantum teleportation") as experiment:
    start_time = time.time()
    
    # conduct experiment as usual
    psi = random_state(1)
    init_gate = Initialize(psi)
    init_gate.label = "init"
    inverse_init_gate = init_gate.gates_to_uncompute()

    qr = QuantumRegister(3, name="q")
    crz = ClassicalRegister(1, name="crz")
    crx = ClassicalRegister(1, name="crx")
    qc = QuantumCircuit(qr, crz, crx)
    qc.append(init_gate, [0])
    qc.barrier()
    create_bell_pair(qc, 1, 2)
    qc.barrier()
    alice_gates(qc, 0, 1)
    measure_and_send(qc, 0, 1)
    bob_gates(qc, 2, crz, crx)
    qc.append(inverse_init_gate, [2])
    cr_result = ClassicalRegister(1)
    qc.add_register(cr_result)
    qc.measure(2,2)
    backend_name = "qasm_simulator"
    backend = BasicAer.get_backend(backend_name)
    counts = execute(qc, backend, shots=1024).result().get_counts()
    
    end_time = time.time()
    
    runtime = end_time - start_time
    
    # qiskitflow =========

    # log parameters used
    experiment.write_parameter("backend name", backend_name)
    # log metrics of experiment
    experiment.write_metric("runtime", runtime)
    # log counts of experiment
    experiment.write_counts("experiment counts", counts)
```

</p>
</details>

------


### CLI


#### List of experiments
```shell
qiskitflow experiments list
```

<details><summary>experiments list screenshot</summary>
<p>

![list](./docs/images/list.png)

</p>
</details>


#### Experiment information (runs)
```shell
qiskitflow experiments info <NAME_OF_EXPERIMENT> --metrics="<METRIC_NAME>,<OTHER_METRIC_NAME>" --parameters="<PARAM>,<OTHER PARAM>"
```

<details><summary>experiment information screenshots</summary>
<p>

Experiment information
![info](./docs/images/info.png)

Experiment with specified optional flags
![info with flags](./docs/images/info-with-args.png)

</p>
</details>

------

### Examples

[Jupyter notebook with quantum teleportation example](./docs/examples/example.ipynb)
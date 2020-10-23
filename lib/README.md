QiskitFlow library
==================

### Hot to run
* [Library](#lib)
* [CLI](#cli)
  * [Experiments list](#list-of-experiments)
  * [Experiment information](#experiment-information-runs)
  * [Share experiment](#share-experiment)


### Lib

Library for quantum programs annotation

Example:
```python
from qiskitflow import Experiment

with Experiment("test experiment",
                save_path="./") as exp:

    # your quantum program here!
    
    exp.write_metric("test metric", 0.1)
    exp.write_metric("test metric 2", 2)

    exp.write_parameter("test parameter", "test parameter value")
    exp.write_parameter("test parameter 2", "test paraeter value 2")

    exp.write_measurement("measurement", {"00": 1024, "11": 0})
```


### CLI


#### List of experiments
```shell
qiskitflow experiments list
```

![list](./docs/images/list.png)

#### Experiment information (runs)
```shell
qiskitflow experiments info <NAME_OF_EXPERIMENT> --metrics="<METRIC_NAME>,<OTHER_METRIC_NAME>" --parameters="<PARAM>,<OTHER PARAM>"
```

Experiment information
![info](./docs/images/info.png)

Experiment with specified optional flags
![info with flags](./docs/images/info%20with%20args.png)

#### Share experiment
```shell
qiskitflow experiments share <NAME_OF_EXPERIMENT>
```


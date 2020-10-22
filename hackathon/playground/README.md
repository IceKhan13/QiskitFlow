README
======



#### Execute experiment

Run experiment locally
```shell
qiskitflow run_local my_quantum_experiment --seed 42
```

Run experiment locally within virtual env (docker)
```shell
qiskitflow run my_quantum_experiment --seed 42
```


#### Share experiments

Share experiments to tracking backend
```shell
qiskitflow share my_quantum_experiment --host localhost
```

#### Download experiments

```shell
qiskitflow get my_quantum_experiment__run_1 --host localhost
```
image := icekhan/qiskitflow-backend
tag = 0.0.0

all: build push

build:
	docker build -t "${image}:${tag}" .
push:
	docker push "${image}:${tag}"
	docker tag "${image}:${tag}" "${image}:latest"
	docker push "${image}:latest"
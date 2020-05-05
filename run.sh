#!/bin/bash
docker build -t pi-sense-hat-library-sample .
docker run --privileged --rm -it --env-file=./.env pi-sense-hat-library-sample


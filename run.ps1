docker build -f "./x86.Dockerfile" -t pi-sense-hat-library-sample .
docker run --rm -it -v "$(pwd):/src" --env-file="./.env" pi-sense-hat-library-sample
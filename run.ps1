docker build -t pi-sense-hat-library-sample .
docker run --rm -it --env-file="./.env" pi-sense-hat-library-sample

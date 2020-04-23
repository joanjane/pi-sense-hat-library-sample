docker build -f "./dev.Dockerfile" -t dev-pi-sense-hat-library-samplet .
docker run --rm -it -v "$(pwd):/src" dev-pi-sense-hat-library-samplet /bin/sh

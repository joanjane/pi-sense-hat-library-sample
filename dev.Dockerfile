FROM node:8-alpine
VOLUME [ "/src" ]
WORKDIR /src

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --virtual build-dependencies add \
    git \
    nano \
    python \
    make \
    g++ \
    linux-headers
FROM node:8-alpine

# Move into a working directory
WORKDIR /usr/src/app

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --virtual build-dependencies add \
    git \
    nano \
    python \
    make \
    g++ \
    linux-headers

# Copy our package.json into the container. This tells npm about the
# module that we're trying to run
COPY package.json ./

# Let's install our dependencies
RUN npm install

# And now let's copy our code into the container
COPY . ./

# Execute our code when the continer starts up
CMD ["npm", "start"]

FROM node:10-alpine

# Python installieren
RUN apk update && apk add python g++ make && rm -rf /var/cache/apk/*
# Create app directory
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/api
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json /usr/src/app/
RUN npm install \
        && npm install -g pm2

# Bundle app source
COPY ./*.js /usr/src/app/
COPY ./libtdjson.so /usr/src/app/
COPY ./libtdjson.so.1.4.0 /usr/src/app/
COPY ./api/*.js /usr/src/app/api/

EXPOSE 46590
CMD pm2 start index.js --no-daemon

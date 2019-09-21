FROM node:10
# Python installieren
#RUN apk update && apk add python g++ make && rm -rf /var/cache/apk/*
RUN apt update
RUN apt install openssl
# Create app directory
RUN mkdir -p /etc/safetygram/
RUN mkdir -p /etc/safetygram/db/
RUN chmod 777 -R /etc/safetygram/

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/api
RUN mkdir -p /usr/src/app/app_html
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json /usr/src/app/
RUN npm install \
        && npm install -g pm2
# Bundle app source
COPY ./*.js /usr/src/app/

# COPY /usr/local/lib/libtdjson.so /usr/src/app/
COPY ./libtdjson.so /usr/src/app/
COPY ./api/*.js /usr/src/app/api/
COPY ./app_html /usr/src/app/app_html

EXPOSE 46590
CMD pm2 start index.js --no-daemon
 
FROM node:10
# Python installieren
#RUN apk update && apk add python g++ make && rm -rf /var/cache/apk/*
RUN apt update
RUN apt install openssl

# Create app directory
RUN mkdir -p /etc/safetygram/ /etc/safetygram/app_html/ /etc/safetygram/frontend-api/ /etc/safetygram/models/ /etc/safetygram/storage-manager/ /etc/safetygram/telegram-input/ && chmod 777 -R /etc/safetygram/

WORKDIR /etc/safetygram/
COPY . /etc/safetygram/

RUN npm install && npm install -g forever
RUN cd /etc/safetygram/telegram-input/ && npm install

EXPOSE 40490
CMD /etc/safetygram/start.sh

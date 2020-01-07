FROM node:12
# Python installieren
#RUN apk update && apk add python g++ make && rm -rf /var/cache/apk/*


RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y make git zlib1g-dev libssl-dev gperf php cmake g++ \
    && rm -rf /var/lib/apt/lists/*
    
RUN git clone --branch=v1.5.0 --depth=1 https://github.com/tdlib/td.git \
    && cd td \
    && rm -rf build \
    && mkdir build \
    && cd build \
    && export CXXFLAGS="" \
    && cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX:PATH=/usr/local .. \
    && cmake --build . --target prepare_cross_compiling \
    && cd .. \
    && php SplitSource.php \
    && cd build \
    && cmake --build . --target install \
    && cd .. \
    && php SplitSource.php --undo \
    && cd .. \
    && ls -l /usr/local

# Create app directory
RUN mkdir -p /usr/src/safetygram/ /usr/src/safetygram/app_html/ /usr/src/safetygram/frontend-api/ /usr/src/safetygram/models/ /usr/src/safetygram/storage-manager/ /usr/src/safetygram/telegram-input/ && chmod 777 -R /usr/src/safetygram/

RUN cp /usr/local/lib/libtdjson.so /usr/src/safetygram/telegram-input/libtdjson.so

WORKDIR /usr/src/safetygram/
COPY . /usr/src/safetygram/
COPY *.sh /usr/src/safetygram/

RUN npm install && npm install -g forever
RUN cd /usr/src/safetygram/telegram-input/ && npm install
RUN cd /usr/src/safetygram/frontend-api/ && npm install
RUN cd /usr/src/safetygram/storage-manager/ && npm install
WORKDIR /usr/src/safetygram/

EXPOSE 40490
RUN chmod 777 /usr/src/safetygram/*.sh

ENTRYPOINT bash /usr/src/safetygram/start.sh

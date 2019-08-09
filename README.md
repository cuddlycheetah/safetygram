![GitHub](https://img.shields.io/github/license/cuddlycheetah/safetygram)
![Telegram](https://img.shields.io/badge/telegram-%40SafetygramApp-blue)

![Docker Pulls](https://img.shields.io/docker/pulls/cuddlycheetah/safetygram?style=for-the-badge)
![Docker Automated build](https://img.shields.io/docker/automated/cuddlycheetah/safetygram?style=for-the-badge)
![Docker Pulls](https://img.shields.io/docker/pulls/cuddlycheetah/safetygram?style=for-the-badge)
![Docker Stars](https://img.shields.io/docker/stars/cuddlycheetah/safetygram?style=for-the-badge)


# Safetygram
Logging all Messages for Telegram Private Chats. Useful when People delete messages, 

## Getting Started

These instructions will get you a copy of the project up and running on your machine. See deployment for notes on how to deploy the project on a live system.

## Settings

There is a settings.json inside the Docker Container (/etc/safetygram/settings.json)
You can change the port of this service by changing "port" to whatever port you want.

## Support
Telegram Channel & Support Group is available [here](https://t.me/SafetygramApp)

## Prerequisites

What things you need to install the software and how to install them

- Linux System (here i used Ubuntu 16.04 64bit)
- Docker `apt install docker`
- Docker-Compose `apt install docker-compose`

## Installing

This Github Repository already contains a prebuilt binary for alpine linux.
There is already an packed docker image for simple-install [cuddlycheetah/safetygram](https://hub.docker.com/r/cuddlycheetah/safetygram)

### using Docker Composer

```
wget https://raw.githubusercontent.com/cuddlycheetah/safetygram/master/docker-compose.yml -O docker-compose.yml
docker-compose pull
docker-compose up -d
```

### using Manual Docker

```
# for installing
docker pull cuddlycheetah/safetygram
docker run -v /etc/safetygram/:/etc/safetygram/ -p 46590:46590 -d cuddlycheetah/safetygram

# for debugging
docker exec -it <name> pm2 log index
```
## Configuring Docker Composer

You can modify this line in docker-compose.yml
```
    ports:
      - "0.0.0.0:46590:46590/tcp"
```
## Building Docker Image

```
docker build -t cuddlycheetah/safetygram .
docker run -d cuddlycheetah/safetygram
docker exec -it <name> pm2 log index
```

## Deployment (if using nginx)

Add nginx https proxy and block port 46590 for incoming packages and listen on 127.0.0.1

## Authors

* **Konrad Schumann** - *Initial work* - [CuddlyCheetah](https://github.com/cuddlycheetah)

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](LICENSE.md) file for details

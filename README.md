![GitHub](https://img.shields.io/github/license/cuddlycheetah/safetygram)
![Telegram](https://img.shields.io/badge/telegram-%40SafetygramApp-blue)

![Docker Pulls](https://img.shields.io/docker/pulls/cuddlycheetah/safetygram?style=for-the-badge)
![Docker Automated build](https://img.shields.io/badge/DOCKER%20BUILD-AUTOMATED-blue?style=for-the-badge)
![Docker Stars](https://img.shields.io/docker/stars/cuddlycheetah/safetygram?style=for-the-badge)

# Safetygram
Logging all Messages for Telegram Private Chats. Useful when People delete messages, complete chats.

* Features:
- Notify you via a Bot, when a Chat gets deleted.
- Backlogs all Messages, Username/Displayname/Bio/ProfilePhoto changes.
- Efficient Storage with MongoDB
- Accessible through HTTP on Port 40490

News, Updates, Discussion and Support: https://t.me/SafetygramApp

## Getting Started
These instructions will get you a copy of the project up and running on your machine. See deployment for notes on how to deploy the project on a live system.

## Settings
!!!IMPORTANT!!! Please change the Password after the Setup rotuine !!!!

## Support
Telegram Channel & Support Group is available [here](https://t.me/SafetygramApp)

## Prerequisites
What things you need to install the software and how to install them

- Linux System (here i used Ubuntu 18.04 64bit)
- Docker `apt install docker`
- Docker-Compose `apt install docker-compose`

## Installing

This Github Repository already contains a prebuilt binary for alpine linux.
There is already an auto-built docker image for simple-install [cuddlycheetah/safetygram](https://hub.docker.com/r/cuddlycheetah/safetygram).

### using Docker Composer

```bash
wget https://raw.githubusercontent.com/cuddlycheetah/safetygram/master/docker-compose.yml -O docker-compose.yml
docker-compose pull
docker-compose up -d
```

## Configuring Docker Composer
You can modify this line in docker-compose.yml
```
    ports:
      - "127.0.0.1:40490:40490/tcp"
```

## Deployment (if using nginx)

Add nginx https proxy

## Authors

* **Konrad Schumann** - *Initial work* - [CuddlyCheetah](https://github.com/cuddlycheetah)

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](LICENSE.md) file for details

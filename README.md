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

### Settings

There is a settings.json inside the Docker Container (/usr/src/app/settings.json)
You can change the port of this service by changing "port" to whatever port you want.

## Support
Telegram Channel & Support Group is available [here](https://t.me/SafetygramApp)

### Prerequisites

What things you need to install the software and how to install them

- Linux System (here i used Ubuntu 16.04 64bit)
- Docker

### Installing

This Github Repository already contains a prebuilt binary for alpine linux.

There is already an packed docker image for simple-install
[cuddlycheetah/safetygram](https://hub.docker.com/r/cuddlycheetah/safetygram)

```
# for installing
docker pull cuddlycheetah/safetygram
docker run cuddlycheetah/safetygram

# for debugging
docker exec -it <name> pm2 log index
```

## Building Docker Image
```
docker build -t cuddlycheetah/safetygram .
docker run -d cuddlycheetah/safetygram
docker exec -it <name> pm2 log index
```

## Deployment

Add nginx https proxy and block port 46590 for incoming packages

## Authors

* **Konrad Schumann** - *Initial work* - [CuddlyCheetah](https://github.com/cuddlycheetah)

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](LICENSE.md) file for details

# Safetygram
Logging all Messages for Telegram Private Chats.

## Getting Started

These instructions will get you a copy of the project up and running on your machine. See deployment for notes on how to deploy the project on a live system.

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

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Konrad Schumann** - *Initial work* - [CuddlyCheetah](https://github.com/cuddlycheetah)

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](LICENSE.md) file for details

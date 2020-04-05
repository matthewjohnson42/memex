# Docker container for personal-memex-ui

A method for creating a Docker container with the Angular app running inside it.

Angular build tasks are done within the container in the interest of ensuring that the build completes regardless of the host platform.

The web server used to route traffic to the built Angular app is [Nginx](https://hub.docker.com/_/nginx).

Prerequisites for running the Docker container:

* Install of [Docker](https://docs.docker.com/install/). An install of docker-compose might also be necessary if running on Linux. 

* Install of [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

To start the container, run the following commands from the command line or terminal:

```
git clone https://github.com/matthewjohnson42/personal-memex-ui.git
cd personal-memex-ui/docker
docker-compose up --build
```

Open your web browser and type in ```localhost:4200```.

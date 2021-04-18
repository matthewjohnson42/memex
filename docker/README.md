# Docker container for memex-ui

A method for creating a Docker container with serving the webpack of the Angular app.

The web server used to route traffic to the built Angular app is [Nginx](https://hub.docker.com/_/nginx).

Prerequisites for running the Docker container:

* Install GNU `sh`

* Install of [npm](https://www.npmjs.com/get-npm)

* Install of [Docker](https://docs.docker.com/install/). An install of docker-compose might also be necessary if running on Linux. 

* Install of [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

To start the container, run the following commands from the command line:

```
git clone https://github.com/matthewjohnson42/memex-ui.git
cd memex-ui/docker
sh docker-compose-up.sh
```

Open your web browser and type in ```localhost:4200```.

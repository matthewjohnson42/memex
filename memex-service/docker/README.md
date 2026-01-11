# docker build module

A module containing scripts and files that are used to start docker containers for the app, a Mongo instance, and an ElasticSearch instance. These containers comprise the full backend of the memex.

Helper scripts prepare the execution environment for Docker image builds, run the Docker image builds, then use docker-compose to start docker containers from the built Docker images. Root helper script is `docker-compose-up.sh`.

## module contents

In addition to standard Dockerfiles for specifying image build and docker-compose files for specifying container build, this maven module includes the following content:

#### `mongo/*`

A directory containing instructions for starting a configured and initialized mongo container.

The directory content includes:
1) a JavaScript file containing DB init queries
1) a shell script that submits the JavaScript contents

#### `docker-build.sh`

Builds the Docker image of Mongo, runs a maven clean install on the project, and uses the output of the maven clean install to build a Docker image of the app.

#### `docker-compose-up.sh`

Invokes the build script, then uses the `docker-compose` command line utility to start containers.

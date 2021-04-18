# Memex UI

An Angular application that implements a UI for submitting and retrieving entries from a knowledge base, named for the [Memex](https://en.wikipedia.org/wiki/Memex) described in a 1945 Atlantic article.

The purpose of the application is to store notes with tags so that those notes may be later referenced across months and years.

The application is hosted on AWS, and interacts with [memex-service](https://github.com/matthewjohnson42/memex-service) as its backend.

The configuration of the host on AWS is provided by [k8s-standalone](https://github.com/matthewjohnson42/k8s-standalone).

### Using the UI locally
To run the Angular application, see the [docker/README.md](https://github.com/matthewjohnson42/memex-ui/blob/master/docker/README.md).

### Using the hosted UI
Navigate your browser to [memex.matthewjohnson42.com](https://memex.matthewjohnson42.com).
Per-user data is not implemented, and so no login is provided here. Demos can be requested from dev@matthewjohnson42.com.

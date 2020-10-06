# Personal Memex UI

An Angular application that implements a UI for submitting and retrieving entries from a personal knowledge base, named for the [Memex](https://en.wikipedia.org/wiki/Memex) described in a 1945 Atlantic article.

To run the Angular application, see the [docker/README.md](https://github.com/matthewjohnson42/personal-memex-ui/blob/master/docker/README.md).

The application is planned to be hosted on AWS, and is planned to interact with [personal-memex-service](https://github.com/matthewjohnson42/personal-memex-service) as its backend.

The purpose of the application is to store notes with tags so that those notes may be later referenced across months and years.

Rebuild can be done by running:
```
npm install @angular/cli
./node_modules/@angular/cli/bin/ng new
```
Follow the prompts to create. Output will be in a named directory.
Sources should be copied over. `angular.json` will need to have styles updated. After copying, run the following:
```
npm run install
npm run install @angular/material
npm run install @angular/cdk
npm run
```

# Dockerfile for building a docker image from the "app" module of this project
FROM openjdk:13.0.2-jdk-slim
CMD mkdir /memex
COPY app/target/memex-service-*.jar /memex/program.jar
COPY docker/app/entrypoint.sh /memex/entrypoint.sh
ENTRYPOINT ["/bin/sh", "/memex/entrypoint.sh"]

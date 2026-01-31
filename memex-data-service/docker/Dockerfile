FROM openjdk:13.0.2-jdk-slim
CMD mkdir /memex-data-service
COPY target/memex-data-service-with-sources-*.jar /memex-data-service/program.jar
COPY docker/entrypoint.sh /memex-data-service/entrypoint.sh
COPY google-drive-service-account-key.p12 /memex-data-service/google-drive-service-account-key.p12
ENTRYPOINT ["/bin/sh", "/memex-data-service/entrypoint.sh"]

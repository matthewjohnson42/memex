#! /bin/bash

if [[ -z ${GOOGLE_DRIVE_SERVICE_ACCOUNT_ID} ]]; then
  echo "Enter value for GOOGLE_DRIVE_SERVICE_ACCOUNT_ID: "
  read GOOGLE_DRIVE_SERVICE_ACCOUNT_ID
  export GOOGLE_DRIVE_SERVICE_ACCOUNT_ID=${GOOGLE_DRIVE_SERVICE_ACCOUNT_ID}
fi

if [[ -z ${GOOGLE_DRIVE_P12_KEY_FILEPATH} ]]; then
  echo "Enter value for GOOGLE_DRIVE_P12_KEY_FILEPATH:"
  read GOOGLE_DRIVE_P12_KEY_FILEPATH
  export GOOGLE_DRIVE_P12_KEY_FILEPATH=${GOOGLE_DRIVE_P12_KEY_FILEPATH}
fi

if [[ -z ${SPRING_PROFILES_ACTIVE} ]]; then
  echo "Enter value for SPRING_PROFILES_ACTIVE (dev, prod, something else): "
  read SPRING_PROFILES_ACTIVE
  export SPRING_PROFILES_ACTIVE=${SPRING_PROFILES_ACTIVE}
fi

export GOOGLE_DRIVE_SERVICE_ACCOUNT_KEY_FILE=/memex-data-service/google-drive-service-account-key.p12

cp ${GOOGLE_DRIVE_P12_KEY_FILEPATH} ../google-drive-service-account-key.p12

# build
mvn clean install -f ../app/pom.xml
docker build --tag memex-data-service:1.0.0 --file Dockerfile ..

rm ../google-drive-service-account-key.p12

# start containers
docker-compose --file docker-compose.yml up --detach

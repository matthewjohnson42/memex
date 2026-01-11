#! /bin/bash

# script for building docker images and starting them using docker-compose
# assumes directory of invocation is memex-service/docker, parent of this script

if [[ -z ${MONGO_DEFAULT_USER_PW} ]]; then
  echo "Enter value for MONGO_DEFAULT_USER_PW: "
  read MONGO_DEFAULT_USER_PW
  export MONGO_DEFAULT_USER_PW=${MONGO_DEFAULT_USER_PW}
fi

if [[ -z ${TOKEN_ENC_KEY_SECRET} ]]; then
  echo "Enter value for TOKEN_ENC_KEY_SECRET: "
  read TOKEN_ENC_KEY_SECRET
  export TOKEN_ENC_KEY_SECRET=${TOKEN_ENC_KEY_SECRET}
fi

if [[ -z ${USERPASS_ENC_KEY_SECRET} ]]; then
  echo "Enter value for USERPASS_ENC_KEY_SECRET: "
  read USERPASS_ENC_KEY_SECRET
  export USERPASS_ENC_KEY_SECRET=${USERPASS_ENC_KEY_SECRET}
fi

if [[ -z ${SPRING_PROFILES_ACTIVE} ]]; then
  echo "Enter value for SPRING_PROFILES_ACTIVE (dev, prod, something else): "
  read SPRING_PROFILES_ACTIVE
  export SPRING_PROFILES_ACTIVE=${SPRING_PROFILES_ACTIVE}
fi

# build
mvn clean install -f ../app/pom.xml
docker build --tag memex-service:1.0.0 --file app/Dockerfile ..

# start containers
docker-compose --file mongo/docker-compose.yml up --detach
echo "waiting for mongo to initialize" && sleep 5
cat mongo/dbInit.js | sed "s/\${MONGO_DEFAULT_USER_PW}/${MONGO_DEFAULT_USER_PW}/g" > mongo/dbInitInterpolated.js
mongo < mongo/dbInitInterpolated.js
docker-compose --file elasticsearch/docker-compose.yml up --detach
echo "waiting for elastic to initialize" && sleep 15
docker-compose --file app/docker-compose.yml up --detach

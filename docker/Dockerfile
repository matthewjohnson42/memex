from nginx:1.17.9-alpine

RUN apk add --update npm

RUN mkdir /app
WORKDIR /app
COPY *.json /app/
COPY src/ /app/src
RUN npm install
RUN npm run ng -- build
RUN cp /app/dist/personal-memex-ui/* /usr/share/nginx/html

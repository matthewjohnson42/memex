FROM nginx:1.17.9-alpine

RUN mkdir /usr/share/nginx/html/assets
COPY dist/memex-ui/* /usr/share/nginx/html/
COPY dist/memex-ui/assets/config.json /usr/share/nginx/html/assets/config.json
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/memex-ui.nginx.conf /etc/nginx/conf.d/memex-ui.conf

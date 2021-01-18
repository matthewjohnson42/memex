
npm install
npm run ng -- build
docker build --tag memex-ui:0.0.1 -f Dockerfile ..
docker-compose -f docker-compose.yml up -d

npm install
npm run ng -- build
sudo docker build --tag memex-ui:0.0.1 -f Dockerfile ..
kubectl apply -f kube-deployment.yml

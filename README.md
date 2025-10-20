# blog-microservices

To create load balance and ingress controller -
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.13.3/deploy/static/provider/cloud/deploy.yaml

- Install docker desktop on macos
- enable kubernetes cluster in docker desktop (single node)
- make sure to have kubectl installed to interact with k8s (ingress-nginx loadbalancer added as config file)
- To install skaffold tool skaffold.dev => brew install skaffold
- front end app in created using create-react-app (migrate it to vite-react)

Todo:

- migrate it to vite-react
- Add feature - Live update comments and posts in the app without reloading the app
- [Tilt.dev](https://tilt.dev/) or [devforce](https://www.devspace.sh/) alternative to skaffold - checkout these.

Common commands used:

```
k rollout restart deployment
k logs name-of-the-pod
k apply -f any-deployment-depl-file.yaml
docker build -t avinashcodelabs/client .
docker push avinashcodelabs/client
k delete deployment client-depl
k get deployments
k get pods
npx create-react-app client
k apply -f ingress-srv.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.13.3/deploy/static/provider/cloud/deploy.yaml
k rollout restart deployment query-depl
k logs event-bus-depl-55c8b7d5c9-24ggr
k rollout restart deployment event-bus-depl
k apply -f .
kubectl describe pod posts
```

To make k8s working in local
Make this change in /etc/hosts file
127.0.0.1 posts.com

Application is available on http://posts.com/
![app](./app.png)

To install skaffold tool skaffold.dev
brew install skaffold

To start the app use below code:
skaffold dev

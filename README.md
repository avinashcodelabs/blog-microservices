# blog-microservices

To create load balance and ingress controller -
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.13.3/deploy/static/provider/cloud/deploy.yaml

To make k8s working in local
Make this change in /etc/hosts file
127.0.0.1 posts.com

Application is available on http://posts.com/
![app](./app.png)

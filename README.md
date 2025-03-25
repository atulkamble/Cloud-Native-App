Cloud-native application development involves building applications that leverage cloud computing advantages, such as scalability, resilience, and flexibility. These applications are typically designed using microservices, containerization (Docker, Kubernetes), and cloud services (AWS, Azure, GCP).

Here's a simple cloud-native application using **Node.js**, **Express**, and **MongoDB**, designed to run in a **Docker** container and orchestrated with **Kubernetes**.

---

### **Project Structure**
```
cloud-native-app/
│── Dockerfile
│── k8s/
│   ├── deployment.yaml
│   ├── service.yaml
│── src/
│   ├── index.js
│   ├── db.js
│── package.json
│── .dockerignore
│── README.md
```

---

### **1. Backend Code (Node.js + Express)**
#### `src/index.js`
```javascript
const express = require('express');
const mongoose = require('./db');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Cloud Native App is Running!");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

#### `src/db.js`
```javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/cloudnative", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

module.exports = mongoose;
```

---

### **2. Dockerfile**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]
```

---

### **3. Kubernetes Deployment**
#### `k8s/deployment.yaml`
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cloud-native-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: cloud-native-app
  template:
    metadata:
      labels:
        app: cloud-native-app
    spec:
      containers:
      - name: app
        image: my-dockerhub-user/cloud-native-app:latest
        ports:
        - containerPort: 3000
        env:
        - name: MONGO_URI
          value: "mongodb://mongo-service:27017/cloudnative"
---
apiVersion: v1
kind: Service
metadata:
  name: cloud-native-app-service
spec:
  selector:
    app: cloud-native-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
```

#### `k8s/mongo-deployment.yaml`
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongo
  template:
    metadata:
      labels:
        app: mongo
    spec:
      containers:
      - name: mongo
        image: mongo:latest
        ports:
        - containerPort: 27017
---
apiVersion: v1
kind: Service
metadata:
  name: mongo-service
spec:
  selector:
    app: mongo
  ports:
    - protocol: TCP
      port: 27017
      targetPort: 27017
```

---

### **4. Running the Application**
#### **Step 1: Build and Push Docker Image**
```sh
docker build -t my-dockerhub-user/cloud-native-app .
docker push my-dockerhub-user/cloud-native-app
```

#### **Step 2: Deploy to Kubernetes**
```sh
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/mongo-deployment.yaml
```

#### **Step 3: Check Status**
```sh
kubectl get pods
kubectl get services
```

---

### **5. Scaling the Application**
```sh
kubectl scale deployment cloud-native-app --replicas=5
```

This is a basic cloud-native application setup. You can extend it with **Helm charts, CI/CD pipelines (GitHub Actions, ArgoCD), Service Mesh (Istio), and Observability (Prometheus, Grafana).** Let me know if you need more features! 🚀

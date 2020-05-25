##!/bin/bash

################################################################################
# Complete the part II of the tutorial  #
################################################################################

# Start creating a development project.
oc new-project fruits-catalog-dev

# Deploy the MongoDB database component.
oc new-app mongodb-persistent --name=mongodb -p DATABASE_SERVICE_NAME=mongodb -p MONGODB_DATABASE=sampledb -l app=fruits-catalog -n fruits-catalog-dev

# Deploy the Spring Boot backend component.
cd ../backend
mvn package
odo create java:8 backend --app fruits-catalog --binary target/fruits-catalog-1.0.0-SNAPSHOT.jar --port 8080/tcp
odo push

# Deploy the NodeJS/Angular frontend component.
oc new-app nodejs~https://github.com/redhat-france-sa/openshift-by-example.git --context-dir=/frontend --name frontend --labels='app.kubernetes.io/part-of=fruits-catalog,app.openshift.io/runtime=nodejs,version=v1'
oc expose svc/frontend

# Configure the different components.
oc create -f ../manifests/backend-configmap.yml -n fruits-catalog-dev
oc set volume dc/backend-fruits-catalog --add --name=backend-config-volume --mount-path=/deployments/config --type=configmap --configmap-name=backend-config
oc set env dc/backend-fruits-catalog --from=secret/mongodb --prefix=MONGODB_
oc set env dc/frontend BACKEND_SERVICE=backend-fruits-catalog:8080
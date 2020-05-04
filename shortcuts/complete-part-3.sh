##!/bin/bash

################################################################################
# Complete the part III of the tutorial  #
################################################################################

# Start creating a production project.
oc new-project fruits-catalog-prod
oc adm policy add-role-to-user edit system:serviceaccount:fruits-catalog-dev:jenkins -n fruits-catalog-prod
oc adm policy add-role-to-group system:image-puller system:serviceaccounts:fruits-catalog-prod -n fruits-catalog-dev

# Deploy the MongoDB database component.
oc new-app mongodb-persistent --name=mongodb -p DATABASE_SERVICE_NAME=mongodb -p MONGODB_DATABASE=sampledb -l app=fruits-catalog -n fruits-catalog-prod

# Deploy all the components manifests.
cd ..
oc create -f manifests -n fruits-catalog-prod

# Deploy a Jenkins instance and pipelines for components.
oc new-app jenkins-persistent -l app=jenkins -p MEMORY_LIMIT=1Gi -n fruits-catalog-dev
oc create -f pipelines/frontend-pipeline.yml -n fruits-catalog-dev
##!/bin/bash

################################################################################
# Complete the part III of the tutorial  #
################################################################################

# Start creating a production project.
oc new-project fruits-catalog-prod
oc adm policy add-role-to-user edit system:serviceaccount:fruits-catalog-dev:jenkins -n fruits-catalog-prod
oc adm policy add-role-to-group system:image-puller system:serviceaccounts:fruits-catalog-prod -n fruits-catalog-dev

# Deploy a Jenkins instance and pipelines for components.
cd ..
oc new-app jenkins-persistent -l app=jenkins -p MEMORY_LIMIT=1Gi -n fruits-catalog-dev
oc create -f pipelines/fruits-cicd-pipeline.yml -n fruits-catalog-dev

# Deploy all the components template and apply it manifests.
oc create -f manifests/template-prod.yml
oc process fruits-catalog-prod -n fruits-catalog-prod | oc create -f - -n fruits-catalog-prod

oc start-build fruits-cicd-pipeline


```
$ oc create -f https://raw.githubusercontent.com/openshift/library/release-4.1/arch/x86_64/official/mongodb/imagestreams/mongodb-rhel7.json -n openshift
$ oc create -f https://raw.githubusercontent.com/openshift/origin/release-4.8/examples/db-templates/mongodb-persistent-template.json -n openshift
$ oc new-app mongodb-persistent --name=mongodb -p DATABASE_SERVICE_NAME=mongodb -p MONGODB_DATABASE=sampledb -l app=fruits-catalog -n fruits-catalog-prod
```

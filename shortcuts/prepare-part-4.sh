##!/bin/bash

################################################################################
# Prepare your cluster for part IV of the tutorial  #
################################################################################

# Start installing all operators and needed custom resources.
oc create -f operators-subscriptions.yaml

# Prepare projects to allow recopy of operators before waiting.
oc new-project istio-system
oc new-project knative-serving

# Wait a moment to allow operators to startup.
echo "Waiting a moment before pursuing..."
sleep 60

# Installing the ServiceMesh.
oc create -f operator-servicemesh-cr.yaml -n istio-system
oc create -f operator-serverless-cr.yaml -n istio-system

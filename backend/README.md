
## fruits-catalog backend

> IMPORTANT: This application requires Java 8 JDK or greater, Maven 3.3.x or greater and MongoDB 3.6 or later.

If you do not have MongoDB installed locally, you can use the `mongodb.sh` script in root directory to launch an ephemeral instance through a docker container bound on `27017` port.

### Run, test and deploy

#### Running locally

To run this microservice on your local host:

```sh
$ mvn spring-boot:run
```

#### Testing it

To interact with your booster while its running, use the API deployed at http://localhost:8080/api/fruitds with this curl command:

```sh
$ curl http://localhost:8080/api/fruits
[]

$ curl -XPOST http://localhost:8080/api/fruits -H 'Content-type: application/json' -d '{"name": "banana", "origin": "france"}' 

$ curl http://localhost:8080/api/fruits
[{"id":"5e95733080c11d0e6770937a","name":"banana","origin":"france"}]
```

### Development notes

#### Health probes

Health probes in Spring Boot 2 applications can be added by including the `spring-boot-starter-actuator` dependency. Actuator is now using Micrometer as a base framework and it will also used when dealing with Prometheus metrics.

Including the dependency is not enough and you should also adapt the `application.yml` configuration file to enable exposing the different management endpoints offered by Actuator like below:

```yml
management:
  endpoints:
    web:
      exposure:
        include: "*"
```

> IMPORTANT: As including any endpoints maybe convenient for our purposes, this is clearly not a production settings. Endpoints should be restricted and protected.


#### Distributed tracing

The `opentracing-spring-jaeger-cloud-starter` dependency is necessary for having OpenTracing support through the Jaeger implementation. Once this dependency is added to your Maven pom.xml, all the Web Servlet endpoints will be instrumented for detecting / creating / closing traces span. Our `FruitController` being a Spring MVC controller, it falls within this instrumentation.

The `ConfigMap` configuration file `application.yml` (or its local variant `application-local.yml` if you make local tests) should be adapted to add configuration for the Jaeger tracer and how to reach the central collector:

```yml
opentracing:
  jaeger:
    enabled: true
    log-spans: true
    enable-b3-propagation: false
    udp-sender:
      host: "jaeger-agent.cockpit.svc.cluster.local"
      port: 5775
```

If you want to test or debug OpenTracing instrumentation locally, you can also choose to deploy Jaeger locally using the Docker image. Just execute:

```sh
$ docker run -it --rm -p 6831:6831/udp -p 6832:6832/udp -p 5775:5775/udp -p 14268:14268 -p 16686:16686 jaegertracing/all-in-one
```

Jaeger GUI will be available on `http://localhost:16686`.

#### Prometheus metrics

Application metrics gathering is included into `spring-boot-starter-actuator` but we need another dependency to have Prometheus format export available. So just add `micrometer-registry-prometheus` dependency to your pom.xml and a new endpoint will be available at `/actuator/prometheus` to make your metrics available at Prometheus text format.

We'll need also to activate the Prometheus endpoint into the application.yml configuration file used as our ConfigMap source:

```yml
management:
  [...]
  endpoint:
    metrics:
      enabled: true
    prometheus:
      enabled: true
  metrics:
    export:
      prometheus:
        enabled: true
```
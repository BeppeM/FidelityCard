# base docker image
FROM openjdk:11
LABEL maintainer="Vincenzo"
ADD target/statistic-service-0.0.1-SNAPSHOT.jar springboot-docker-statistic-service.jar
#Port Expose
EXPOSE 8084
# Application commands
ENTRYPOINT ["java", "-jar", "springboot-docker-statistic-service.jar"]
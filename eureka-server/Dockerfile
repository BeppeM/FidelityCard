# base docker image
FROM openjdk:11
LABEL maintainer="Beppe_01"
VOLUME /tmp
# copia il file .jar nel docker image springboot-docker-config-server.jar
ADD target/eureka-server-0.0.1-SNAPSHOT.jar springboot-docker-eureka-server.jar
EXPOSE 8761
# comandi per eseguire l'applicazione
ENTRYPOINT ["java", "-jar", "springboot-docker-eureka-server.jar"]
# base docker image
FROM openjdk:11
LABEL maintainer="Beppe_01"
VOLUME /tmp
# copia il file .jar nel docker image springboot-docker-config-server.jar
ADD target/gateway-service-0.0.1-SNAPSHOT.jar springboot-docker-cloudgateway.jar
#Adding the bash script for waiting mysqldb
COPY ./wait-for-it.sh /wait-for-it.sh

EXPOSE 8080
# comandi per eseguire l'applicazione
ENTRYPOINT ["/wait-for-it.sh", "config-server:8888", "--timeout=30", "--", "/wait-for-it.sh", "eureka-server:8761", "--timeout=30", "--", "java", "-jar", "springboot-docker-cloudgateway.jar"]
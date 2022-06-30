# base docker image
FROM openjdk:11
LABEL maintainer="Giuseppe"
# copia il file .jar nel docker image springboot-docker-config-server.jar
ADD target/manager-service-0.0.1-SNAPSHOT.jar springboot-docker-manager-service.jar
#Adding the bash script for waiting mysqldb
COPY ./wait-for-it.sh /wait-for-it.sh
#Expose della porta
EXPOSE 8081
# comandi per eseguire l'applicazione
ENTRYPOINT ["/wait-for-it.sh", "mysqldb:3306", "--timeout=30", "--", "java", "-jar", "springboot-docker-manager-service.jar"]
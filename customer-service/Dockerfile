# base docker image
FROM openjdk:11
LABEL maintainer="Vincenzo"

ADD target/customer-service-0.0.1-SNAPSHOT.jar springboot-docker-customer-service.jar
#Adding the bash script for waiting mysqldb
COPY ./wait-for-it.sh /wait-for-it.sh
#Port Expose
EXPOSE 8082
# Application commands
ENTRYPOINT ["/wait-for-it.sh", "mysqldb:3306", "--timeout=30", "--", "java", "-jar", "springboot-docker-customer-service.jar"]
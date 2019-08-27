FROM java:8
WORKDIR /usr/src
ADD /target/netflix-eureka-naming-server-0.0.1-SNAPSHOT.jar /usr/src/netflix-eureka-naming-server-0.0.1-SNAPSHOT.jar
EXPOSE 8761
ENTRYPOINT ["java" ,"-jar","netflix-eureka-naming-server-0.0.1-SNAPSHOT.jar"]
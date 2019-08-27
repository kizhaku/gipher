FROM java:8
WORKDIR /usr/src
ADD /target/netflix-zuul-api-gateway-server-0.0.1-SNAPSHOT.jar /usr/src/netflix-zuul-api-gateway-server-0.0.1-SNAPSHOT.jar
EXPOSE 8765
ENTRYPOINT ["java" ,"-jar","netflix-zuul-api-gateway-server-0.0.1-SNAPSHOT.jar"]
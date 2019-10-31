FROM java:8
WORKDIR /usr/src
ADD /target/zuul-api-gateway-server-1.0.jar /usr/src/zuul-api-gateway-server-1.0.jar
EXPOSE 8765
ENTRYPOINT ["java" ,"-jar","zuul-api-gateway-server-1.0.jar"]
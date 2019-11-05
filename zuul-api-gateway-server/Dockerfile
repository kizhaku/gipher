FROM java:8
WORKDIR /Users/Shared
ADD /target/zuul-api-gateway-server-1.0.jar /Users/Shared/zuul-api-gateway-server-1.0.jar
EXPOSE 8765:8765
ENTRYPOINT ["java" ,"-jar","zuul-api-gateway-server-1.0.jar"]
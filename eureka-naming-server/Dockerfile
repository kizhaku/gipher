FROM java:8
WORKDIR /usr/src/local
ADD /target/eureka-naming-server-1.0.jar /usr/src/local/eureka-naming-server-1.0.jar
EXPOSE 8761:8761
ENTRYPOINT ["java" ,"-jar","eureka-naming-server-1.0.jar"]
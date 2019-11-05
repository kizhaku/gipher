FROM java:8
WORKDIR /Users/Shared
ADD /target/eureka-naming-server-1.0.jar /Users/Shared/eureka-naming-server-1.0.jar
EXPOSE 8761:8761
ENTRYPOINT ["java" ,"-jar","eureka-naming-server-1.0.jar"]
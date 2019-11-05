FROM java:8
WORKDIR /Users/Shared
ADD /target/giphermanager-1.0.jar /Users/Shared/giphermanager-1.0.jar
EXPOSE 9100:9100
ENTRYPOINT ["java" ,"-jar","giphermanager-1.0.jar"]
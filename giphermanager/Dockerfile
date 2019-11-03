FROM java:8
WORKDIR /usr/src/local
ADD /target/giphermanager-1.0.jar /usr/src/local/giphermanager-1.0.jar
EXPOSE 9100:9100
ENTRYPOINT ["java" ,"-jar","giphermanager-1.0.jar"]
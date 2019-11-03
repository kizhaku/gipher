FROM java:8
WORKDIR /usr/src/local
ADD /target/gipherrecommendersystem-1.0.jar /usr/src/local/gipherrecommendersystem-1.0.jar
EXPOSE 9200:9200
ENTRYPOINT ["java" ,"-jar","gipherrecommendersystem-1.0.jar"]
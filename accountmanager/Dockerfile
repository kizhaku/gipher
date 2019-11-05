FROM java:8
ENV MYSQL_ROOT_PASSWORD=Kit@mysql4
ENV MYSQL_DATABASE=accountmananager
WORKDIR /Users/Shared
ADD /target/accountmanager-1.0.jar /Users/Shared/accountmanager-1.0.jar
EXPOSE 8089:8089
ENTRYPOINT ["java" ,"-jar","accountmanager-1.0.jar"]
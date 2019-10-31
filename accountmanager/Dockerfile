FROM java:8
ENV MYSQL_ROOT_PASSWORD=Kit@mysql4
ENV MYSQL_DATABASE=accountmananager
WORKDIR /usr/src
ADD /target/accountmanager-1.0.jar /usr/src/accountmanager-1.0.jar
EXPOSE 8089:8089
ENTRYPOINT ["java" ,"-jar","accountmanager-1.0.jar"]
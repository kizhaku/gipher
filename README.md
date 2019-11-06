# Gipher - A Capsule Case Study

## Problem Statement

Build a system to manage and recommend GIFs to a user. Refer https://giphy.com/

## Requirements:
1. The application needs to fetch gifs from https://developers.giphy.com/docs/
2. A frontend where the user can search, view and bookmark gifs.
3. A user can add a gif to bookmark and should be able to view bookmark list.
3. A recommendation service should be able to store all the unique bookmarked gifs from all the users and maintain counter for number of users added a particular gifs into bookmark list. 
4. An option to view recommended gifs should be available on frontend. 

## Modules:
1. AccountManager - Should be able to manage user accounts
2. GipherUI -
  - User should be able to
    - search GIFs
    - bookmark GIFs
    - should be able to see bookmarked GIFs
  - Application should be a responsive which can smoothly run on mobile devices.
3. GipherManager - Application should be able to store all his
  - bookmarks
  - searches
4. GipherRecommenderSystem - should be able to store all the unique bookmarked gifs from all the users and maintain counter for number of users added a particular gifs into bookmark list.

## Modules Required:
- Spring Boot
- MySQL, MongoDB
- API Gateway
- Eureka Server
- Message Broker (RabbitMQ)
- Angular
- CI (Gitlab Runner)
- Docker, Docker Compose

## Flow of Modules

- Building Frontend:
  1. Building Responsive Views:
    - Build a View to show all GIF’s
      - GIF’s - Populating from external api
      - Recommended GIF’s - Populating from GipherRecommenderSystem
      - Build a view to show bookmarked gifs
      - A view to authenticate users
  2. Using Services to populate these data in views
  3. Stitching these views using Routes and Guards
  4. Making the UI Responsive
  5. E2E and Unit tests
  6. Writing CI configuration file
  8. Dockerizing the frontend

- Building the AccountManager
  1. Creating a server in Spring Boot to facilitate registration and login using JWT token and MySQL
  2. Writing Swagger Documentation
  3. Unit Testing
  4. Write CI Configuration
  5. Dockerize the application
  6. Write docker-compose file to build both frontend and backend application
  
- Create an API Gateway which can serve UI and API Request from same host

- Building the GipherManager
  1. Building a server in Spring Boot to facilitate CRUD operation over GIF’s and bookmarked resources stored in MongoDB
  2. Writing Swagger Documentation
  3. Build a Producer for RabbitMQ which
    1. Produces events like what user bookmarked
  4. Write Test Cases
  5. Write CI Configuration
  6. Dockerize the application
  7. Update the docker-compose

- Building a GipherRecommenderSystem
  1. Building a Consumer for RabbitMQ
    - i. On a new event generated Update the recommendations in the system. Store the     recommendation list in MongoDB.
    - ii. Maintain list of unique recommended gifs based on what user added into       bookmark and keep counter for number of users added a particular gif into bookmark list.
  2. Build an API to get recommendations
  3. Writing Swagger documentation
  4. Write Test Cases
  5. Write CI Configuration
  6. Dockerize the application
  7. Update the docker-compose
  8. Update the API Gateway

- Create Eureka server and make other services as client

- Demonstrate the entire application

Docker container commands
--------------------------
- Create images
	1. Gipher UI:
		Navigate to gipher/GipherUI directory. 
		run docker build -t akizhaku/gipherui:v1 .
		
	2. Account manager:
		Navigate to gipher/accountmanager.
		run docker build -t akizhaku/gipher-accountmanager:v1 .
		
	3. Gipher manager:
		Navigate to gipher/giphermanager
		run docker build -t akizhaku/gipher-manager:v1 .
		
	4. Gipher recommender:
		Navigate to gipher/gipherrecommendersystem
		run docker build -t akizhaku/gipher-recommender:v1 .
		
	5. Eureka:
		Navigate to gipher/eureka-naming-server
		run docker build -t akizhaku/gipher-eureka:v1 .
		
	6. Zuul:
		Navigate to gipher/zuul-api-gateway-server
		run docker build -t akizhaku/gipher-zuulapi:v1 .
		
- View images
	run docker images
	
- Push to repository
	run docker push akizhaku/gipherui:v1
	run docker push akizhaku/gipher-accountmanager:v1
	run docker push akizhaku/gipher-manager:v1
	run docker push akizhaku/gipher-recommender:v1
	run docker push akizhaku/gipher-eureka:v1
	run docker push akizhaku/gipher-zuulapi:v1
	
- Compose
	Navigate to root directory /gipher.
	run docker-compose up			

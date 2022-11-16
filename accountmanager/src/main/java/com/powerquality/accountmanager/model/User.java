package com.powerquality.accountmanager.model;

import java.util.Date;

//@Entity
public class User {

    //@Id
    //@Column(length=50)
    private String userId;
    //@Column(length=100)
    private String firstName;
    //@Column(length=100)
    private String lastName;
    //@Column(length=100)
    private String userPassword;
    //@Column(length=100)
    private String userRole;
    private Date userAddedDate;
   
    public User() {

	}
    
    public User(String userId, String firstName, String lastName, String userPassword, String userRole, Date userAddedDate) {
		this.userId = userId;
		this.firstName = firstName; 
		this.lastName = lastName;
		this.userPassword = userPassword;
		this.userRole = userRole;
		this.userAddedDate = userAddedDate;
	}
	
    public String getUserId() {
    	return this.userId;
    }

    public void setUserId(String  userId) {
       this.userId = userId;
    }

    public String getFirstName() {
    	return this.firstName;
    }

    public void setFirstName(String  firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
    	return this.lastName;
    }

    public void setLastName(String  lastName) {
       this.lastName = lastName;
    }

    public String getUserPassword() {
    	return this.userPassword;
    }

    public void setUserPassword(String  userPassword) {
       this.userPassword = userPassword;
    }

    public String getUserRole() {
    	return this.userRole;
    }

    public void setUserRole(String  userRole) {
    	this.userRole = userRole;
    }

    public Date getUserAddedDate() {
        return this.userAddedDate;
    }

    public void setUserAddedDate(Date userAddedDate) {
        this.userAddedDate = userAddedDate;
    }

    


}

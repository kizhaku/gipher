package com.stackroute.accountmanager.service;

import com.stackroute.accountmanager.exception.UserAlreadyExistsException;
import com.stackroute.accountmanager.exception.UserNotFoundException;
import com.stackroute.accountmanager.model.User;

public interface UserService {

	User registerUser(User user) throws UserAlreadyExistsException;

 	boolean checkUserIdExists(String userId);
}

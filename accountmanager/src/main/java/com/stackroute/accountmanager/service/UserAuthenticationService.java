package com.stackroute.accountmanager.service;

import com.stackroute.accountmanager.exception.UserNotFoundException;
import com.stackroute.accountmanager.model.User;

public interface UserAuthenticationService {

    public User findByUserIdAndPassword(String userId, String password) throws UserNotFoundException;

}

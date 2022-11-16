package com.powerquality.accountmanager.service;

import com.powerquality.accountmanager.exception.UserNotFoundException;
import com.powerquality.accountmanager.model.User;

public interface UserAuthenticationService {

    public User findByUserIdAndPassword(String userId, String password) throws UserNotFoundException;

}

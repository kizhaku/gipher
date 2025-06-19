package com.gipher.accountmanager.service;

import com.gipher.accountmanager.exception.UserNotFoundException;
import com.gipher.accountmanager.model.User;

public interface UserAuthenticationService {

    public User findByUserIdAndPassword(String userId, String password) throws UserNotFoundException;

}

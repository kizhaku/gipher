package com.stackroute.accountmanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.accountmanager.exception.UserNotFoundException;
import com.stackroute.accountmanager.model.User;
import com.stackroute.accountmanager.repository.UserRepository;


@Service
public class UserAuthenticationServiceImpl implements UserAuthenticationService {

	private UserRepository userRepository;
	
	@Autowired
	public UserAuthenticationServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

    @Override
    public User findByUserIdAndPassword(String userId, String password) throws UserNotFoundException {
    	
    	User user = this.userRepository.findByUserIdAndUserPassword(userId, password);
    	
    	if(user == null) {
    		throw new UserNotFoundException("User not found");
    	}
      
        return user;
    }
}

package com.powerquality.accountmanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.powerquality.accountmanager.exception.UserNotFoundException;
import com.powerquality.accountmanager.model.User;
import com.powerquality.accountmanager.repository.UserRepository;


@Service
public class UserAuthenticationServiceImpl implements UserAuthenticationService {

	//private UserRepository userRepository;
	
//	@Autowired
//	public UserAuthenticationServiceImpl(UserRepository userRepository) {
//		this.userRepository = userRepository;
//	}

    @Override
    public User findByUserIdAndPassword(String userId, String password) throws UserNotFoundException {
    	
    	//User user = this.userRepository.findByUserIdAndUserPassword(userId, password);
    	
    	if(userId.equalsIgnoreCase("admin") && password.equalsIgnoreCase("admin")) {
    		User user = new User();
    		user.setFirstName("Admin");
    		user.setUserRole("admin");
    		
    		return user;
    	}
    	else {
    		throw new UserNotFoundException("User not found");
    	}
    }
}

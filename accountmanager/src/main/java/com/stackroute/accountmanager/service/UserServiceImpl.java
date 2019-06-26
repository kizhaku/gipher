package com.stackroute.accountmanager.service;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.accountmanager.exception.UserAlreadyExistsException;
import com.stackroute.accountmanager.model.User;
import com.stackroute.accountmanager.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	UserRepository userRepository;
	
	@Autowired
	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public User registerUser(User user) throws UserAlreadyExistsException {
		
		if(checkUserIdExists(user.getUserId())) {
			throw new UserAlreadyExistsException("User exists");
		}
		
		user.setUserAddedDate(new Date());
		User userAdd = this.userRepository.save(user);
		
		if(userAdd == null) {
			throw new UserAlreadyExistsException("User already exist");
		}

		return user;
	}

	public boolean checkUserIdExists(String userId) {

		Optional<User> user = userRepository.findById(userId);
		
		if(user.isPresent()) {
			return true;
		}
		
		return false;
	}

}

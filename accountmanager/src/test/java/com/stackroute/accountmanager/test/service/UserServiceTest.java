package com.stackroute.accountmanager.test.service;

import java.util.Date;
import java.util.Optional;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.stackroute.accountmanager.exception.UserAlreadyExistsException;
import com.stackroute.accountmanager.model.User;
import com.stackroute.accountmanager.repository.UserRepository;
import com.stackroute.accountmanager.service.UserServiceImpl;

public class UserServiceTest {

	@Mock
	private UserRepository userRepository;
	@InjectMocks
	private UserServiceImpl userServiceImpl;
	User user;
	Optional<User> optionalOfUser;
	
	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		user = new User();
		user.setUserId("user_unittest");
		user.setFirstName("unittest_firstname");
		user.setLastName("unittest_lastname");
		user.setUserAddedDate(new Date());
		user.setUserPassword("pass");
		user.setUserRole("admin");
		optionalOfUser = Optional.of(user);
	}
	
	@Test
	public void testRegisterUserSuccess() throws UserAlreadyExistsException{
		Mockito.when(userRepository.findById(user.getUserId())).thenReturn(Optional.empty());
		Mockito.when(userRepository.save(user)).thenReturn(user);
		
		User userAdded = userServiceImpl.registerUser(user);
		
		Assert.assertEquals(user, userAdded);
		
	}
	
	@Test(expected = UserAlreadyExistsException.class)
	public void testRegisterUserFailure() throws UserAlreadyExistsException{
		Mockito.when(userRepository.findById(user.getUserId())).thenReturn(optionalOfUser);
		Mockito.when(userRepository.save(user)).thenReturn(user);	
		
		userServiceImpl.registerUser(user);
	}
}

package com.stackroute.accountmanager.test.service;

import java.util.Date;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.stackroute.accountmanager.exception.UserNotFoundException;
import com.stackroute.accountmanager.model.User;
import com.stackroute.accountmanager.repository.UserRepository;
import com.stackroute.accountmanager.service.UserAuthenticationServiceImpl;

public class UserAuthenticationServiceTest {
	
	@Mock
	private UserRepository userRepository;
	@InjectMocks
	private UserAuthenticationServiceImpl userAuthenticationServiceImpl;
	private User user;
	
	@Before
    public void setUp() throws Exception {
		MockitoAnnotations.initMocks(this);
		user = new User();
		user.setUserId("user_unittest");
		user.setFirstName("unittest_firstname");
		user.setLastName("unittest_lastname");
		user.setUserAddedDate(new Date());
		user.setUserPassword("pass");
		user.setUserRole("admin");
    }

	@Test
	public void testFindByUserIdAndPasswordSuccess() throws UserNotFoundException{
		Mockito.when(userRepository.findByUserIdAndUserPassword(user.getUserId(), user.getUserPassword()))
		.thenReturn(user);
		
		User userFound = userAuthenticationServiceImpl.findByUserIdAndPassword(user.getUserId(), user.getUserPassword());
		Assert.assertEquals(user, userFound);
	}
	
	@Test(expected = UserNotFoundException.class)
	public void testFindByUserIdAndPasswordFailure() throws UserNotFoundException {
		Mockito.when(userRepository.findByUserIdAndUserPassword(user.getUserId(), user.getUserPassword()))
		.thenReturn(null);
		
		userAuthenticationServiceImpl.findByUserIdAndPassword(user.getUserId(), user.getUserPassword());
	}
}

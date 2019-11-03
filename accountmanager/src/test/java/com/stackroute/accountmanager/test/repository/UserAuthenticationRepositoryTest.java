package com.stackroute.accountmanager.test.repository;

import java.util.Date;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.stackroute.accountmanager.model.User;
import com.stackroute.accountmanager.repository.UserRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserAuthenticationRepositoryTest {
	
	@Autowired
	private UserRepository userRepository;
	private User user;
	
	@Before
	public void SetUp() {
		user = new User();
		user.setUserId("user_unittest");
		user.setFirstName("unittest_firstname");
		user.setLastName("unittest_lastname");
		user.setUserAddedDate(new Date());
		user.setUserPassword("pass");
		user.setUserRole("admin");
	}
	
	@Ignore
	@After
    public void tearDown() throws Exception {
		userRepository.deleteAll();
    }
	
	@Ignore
	@Test
	public void testRegisterUserSuccess() {
		userRepository.save(user);
		User savedUser = userRepository.findById(user.getUserId()).get();
		
		Assert.assertEquals(user.getUserId(), savedUser.getUserId());
	}
	
	@Ignore
	@Test
	public void testLoginUserSuccess() {
		userRepository.save(user);
		User savedUser = userRepository.findById(user.getUserId()).get();
		
		Assert.assertEquals(user.getUserId(), savedUser.getUserId());
	}
}

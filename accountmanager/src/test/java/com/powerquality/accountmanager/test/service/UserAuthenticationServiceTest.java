package com.powerquality.accountmanager.test.service;

public class UserAuthenticationServiceTest {
	
//	@Mock
//	private UserRepository userRepository;
//	@InjectMocks
//	private UserAuthenticationServiceImpl userAuthenticationServiceImpl;
//	private User user;
//	
//	@Before
//    public void setUp() throws Exception {
//		MockitoAnnotations.initMocks(this);
//		user = new User();
//		user.setUserId("user_unittest");
//		user.setFirstName("unittest_firstname");
//		user.setLastName("unittest_lastname");
//		user.setUserAddedDate(new Date());
//		user.setUserPassword("pass");
//		user.setUserRole("admin");
//    }
//
//	@Test
//	public void testFindByUserIdAndPasswordSuccess() throws UserNotFoundException{
//		Mockito.when(userRepository.findByUserIdAndUserPassword(user.getUserId(), user.getUserPassword()))
//		.thenReturn(user);
//		
//		User userFound = userAuthenticationServiceImpl.findByUserIdAndPassword(user.getUserId(), user.getUserPassword());
//		Assert.assertEquals(user, userFound);
//	}
//	
//	@Test(expected = UserNotFoundException.class)
//	public void testFindByUserIdAndPasswordFailure() throws UserNotFoundException {
//		Mockito.when(userRepository.findByUserIdAndUserPassword(user.getUserId(), user.getUserPassword()))
//		.thenReturn(null);
//		
//		userAuthenticationServiceImpl.findByUserIdAndPassword(user.getUserId(), user.getUserPassword());
//	}
}

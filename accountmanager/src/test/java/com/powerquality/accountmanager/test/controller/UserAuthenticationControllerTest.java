package com.gipher.accountmanager.test.controller;

import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@WebMvcTest
public class UserAuthenticationControllerTest {
	
//	@Autowired
//	private MockMvc mockMvc;
//	@MockBean
//	private UserAuthenticationService userAuthenticationService;
//	private User user;
//	@InjectMocks
//	private UserAuthenticationController userAuthenticationController;
//
//	
//	@Before
//	public void setUp() {
//		MockitoAnnotations.initMocks(this);
//		mockMvc = MockMvcBuilders.standaloneSetup(userAuthenticationController).build();
//		
//		user = new User();
//		user.setUserId("user_unittest");
//		user.setFirstName("unittest_firstname");
//		user.setLastName("unittest_lastname");
//		user.setUserAddedDate(new Date());
//		user.setUserPassword("pass");
//		user.setUserRole("admin");
//	}
//	
//	@Test
//	public void testAuthenticateUserSuccess() throws Exception{
//		Mockito.when(userAuthenticationService.findByUserIdAndPassword(user.getUserId(), user.getUserPassword())).thenReturn(user);
//		mockMvc.perform(MockMvcRequestBuilders.post("/auth/api/v1/login")
//				.contentType(MediaType.APPLICATION_JSON)
//				.content(jsonToString(user)))
//		.andExpect(MockMvcResultMatchers.status().isOk());
//	}
//	
//	@Test
//	public void testAuthenticateUserFailure() throws Exception{
//		Mockito.when(userAuthenticationService.findByUserIdAndPassword(user.getUserId(), user.getUserPassword()))
//			.thenThrow(new UserNotFoundException("error"));
//
//		mockMvc.perform(MockMvcRequestBuilders.post("/auth/api/v1/login")
//				.contentType(MediaType.APPLICATION_JSON)
//				.content(jsonToString(user)))
//		.andExpect(MockMvcResultMatchers.status().isUnauthorized());
//	}
//	
//	@Test
//	public void testValidateTokenSuccess() throws Exception{
//		Mockito.when(userAuthenticationService.findByUserIdAndPassword(user.getUserId(), user.getUserPassword())).thenReturn(user);
//		String bearerToken = userAuthenticationController.getToken(user.getUserId(), user.getUserPassword());
//		
//		mockMvc.perform(MockMvcRequestBuilders.get("/auth/api/v1/isauthenticated")
//				.header("authorization", "Bearer " +bearerToken)
//				.contentType(MediaType.APPLICATION_JSON))
//		.andExpect(MockMvcResultMatchers.status().isOk());
//	}
//	
//	@Test
//	public void testValidateTokenFailure() throws Exception{
//		Mockito.when(userAuthenticationService.findByUserIdAndPassword(user.getUserId(), user.getUserPassword())).thenReturn(user);
//		String bearerToken = "AnIncorrectToken";
//		
//		mockMvc.perform(MockMvcRequestBuilders.get("/auth/api/v1/isauthenticated")
//				.header("authorization", "Bearer " +bearerToken)
//				.contentType(MediaType.APPLICATION_JSON))
//		.andExpect(MockMvcResultMatchers.status().isUnauthorized());
//	}
//	
//	// Parsing String format data into JSON format
//    private static String jsonToString(final Object obj) throws JsonProcessingException {
//        String result;
//        try {
//            final ObjectMapper mapper = new ObjectMapper();
//            final String jsonContent = mapper.writeValueAsString(obj);
//            result = jsonContent;
//        } catch (JsonProcessingException e) {
//            result = "Json processing error";
//        }
//        return result;
//    }

}

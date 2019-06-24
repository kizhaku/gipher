package com.stackroute.accountmanager.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.accountmanager.model.User;
import com.stackroute.accountmanager.service.UserAuthenticationService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins="*", allowedHeaders="*")
public class UserAuthenticationController {
	
	static final long EXPIRATION_TIME = 300000;
	UserAuthenticationService userAuthenticationService;
	Map<String,String> responseMap = new HashMap<>();
	
	@Autowired
    public UserAuthenticationController(UserAuthenticationService authicationService) {  	
    	this.userAuthenticationService = authicationService;
	}
    
	//Authenticate user with userid and password.
    @PostMapping("/api/v1/login")
    public ResponseEntity<?> authenticateUser(@RequestBody User user) {
    	
    	String jwtToken = "";
    	
    	try {
	    		jwtToken = getToken(user.getUserId(),user.getUserPassword());
	    		responseMap.clear();
	    		responseMap.put("message", "User Successfully Logged In");
	    		responseMap.put("token", jwtToken);
    		} catch (Exception e) {
    			responseMap.clear();
    			responseMap.put("message", e.getMessage());
    			responseMap.put("token", null);
    			
    			return new ResponseEntity<>(responseMap, HttpStatus.UNAUTHORIZED);
    		}
    		
    		return new ResponseEntity<>(responseMap, HttpStatus.OK);
    }

    // Generate JWT token
	public String getToken(String username, String password) throws Exception {
		if(username == null || password == null) {
			throw new ServletException("Provide username and password");
		}
		
		userAuthenticationService.findByUserIdAndPassword(username, password);
		
		return Jwts.builder()
				.setSubject(username)
			    .setIssuedAt(new Date())
			    .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME ))
			    .signWith(SignatureAlgorithm.HS256, "secretkey").compact();
	}
	
	//Authenticate the bearer token.
	@GetMapping("/api/v1/isauthenticated")
	public ResponseEntity<?> validateToken(ServletRequest request) throws ServletException {
		
		HttpServletRequest httpReq = (HttpServletRequest) request;		
		String authHeader = httpReq.getHeader("authorization");
		HashMap<String, String> authResponse = new HashMap<>();
		authResponse.put("isAuthenticated", "false");
		
		if(authHeader == null || !authHeader.startsWith("Bearer")) {
			return new ResponseEntity<>(authResponse, HttpStatus.OK);
		}
		
		String token = authHeader.substring(7);
		try {
			Claims claims = Jwts.parser().setSigningKey("secretkey").parseClaimsJws(token).getBody();
			authResponse.put("isAuthenticated", "true");
			return new ResponseEntity<>(authResponse, HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			authResponse.put("isAuthenticated", "false");
			return new ResponseEntity<>(authResponse, HttpStatus.OK);
		}	

	}
	
}
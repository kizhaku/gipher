package com.stackroute.accountmanager.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.accountmanager.exception.UserAlreadyExistsException;
import com.stackroute.accountmanager.model.User;
import com.stackroute.accountmanager.service.UserService;



@RestController
@RequestMapping("/auth")
@CrossOrigin(origins="*", allowedHeaders="*")
public class UserController {
	
	UserService userService;
	Map<String,String> responseMap = new HashMap<>();
	
	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@PostMapping("/api/v1/user")
	public ResponseEntity<?> registerUser(@RequestBody User user){	
		
		try {
			this.userService.registerUser(user);
			responseMap.put("status", "true");
		} catch(UserAlreadyExistsException e) {
			return new ResponseEntity<>("User exists", HttpStatus.CONFLICT);
		}
		
		return new ResponseEntity<>(responseMap, HttpStatus.CREATED);
	}

}

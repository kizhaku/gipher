package com.gipher.accountmanager.repository;

import com.gipher.accountmanager.model.User;

//@Repository
public interface UserRepository //extends JpaRepository<User, String> 
{
	
	User findByUserIdAndUserPassword(String userId, String userPassword);
    
}

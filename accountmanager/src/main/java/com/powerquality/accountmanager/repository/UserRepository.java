package com.powerquality.accountmanager.repository;

import com.powerquality.accountmanager.model.User;

//@Repository
public interface UserRepository //extends JpaRepository<User, String> 
{
	
	User findByUserIdAndUserPassword(String userId, String userPassword);
    
}

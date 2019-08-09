package com.stackroute.giphermanager.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class GiphBookmark {
	
	@Id
	String id;
	String gifId;
	String userName;
	
	public GiphBookmark() {
		
	}
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	public String getUserName() {
		return userName;
	}
	
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public String getGifId() {
		return gifId;
	}
	
	public void setGifId(String giphId) {
		this.gifId = giphId;
	}
}

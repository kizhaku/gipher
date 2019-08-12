package com.stackroute.gipherrecommendersystem.model;

import java.io.Serializable;

public class BookmarkMessage implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String gifId;
	private String userName;
	
	public BookmarkMessage() {
		
	}
	
	public String getGifId() {
		return gifId;
	}
	
	public void setGifId(String gifId) {
		this.gifId = gifId;
	}
	
	public String getUserName() {
		return userName;
	}
	
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
}

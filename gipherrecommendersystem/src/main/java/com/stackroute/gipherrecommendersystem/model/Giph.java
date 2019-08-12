package com.stackroute.gipherrecommendersystem.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Giph {
	
	@Id
	String gifId;
	Integer count;
	
	public Giph() {
		this.count = 1;
	}
	
	public String getGifId() {
		return gifId;
	}
	
	public void setGifId(String gifId) {
		this.gifId = gifId;
	}
	
	public Integer getCount() {
		return count;
	}
	
	public void setCount(Integer count) {
		this.count = count;
	}

}

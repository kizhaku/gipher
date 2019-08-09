package com.stackroute.giphermanager.service;

import org.springframework.stereotype.Service;

import com.stackroute.giphermanager.model.BookmarkMessage;

@Service
public interface MessageQueueService {

	void send(BookmarkMessage message);

}
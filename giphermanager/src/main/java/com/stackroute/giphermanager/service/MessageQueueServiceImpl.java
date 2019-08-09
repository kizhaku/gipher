package com.stackroute.giphermanager.service;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.stackroute.giphermanager.model.BookmarkMessage;

@Service
public class MessageQueueServiceImpl implements MessageQueueService {
	
	@Autowired
	RabbitTemplate rabbitTemplate;
	
	@Value("${rabbitmq.bookmarkExchange}")
	private String exchange;
	
	@Value("${rabbitmq.bookmarkRoutingKey}")
	private String routingKey;
	
	@Override
	public void send(BookmarkMessage message) {
		rabbitTemplate.convertAndSend(exchange, routingKey, message);
	}
}

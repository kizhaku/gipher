package com.stackroute.gipherrecommendersystem.service;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.stackroute.gipherrecommendersystem.model.BookmarkMessage;
import com.stackroute.gipherrecommendersystem.model.Giph;

@Component
public class MessageConsumer {
	
	private GiphRecommenderService giphRecommenderService;
	
	@Autowired
	public MessageConsumer(GiphRecommenderService giphRecommenderService) {
		this.giphRecommenderService = giphRecommenderService;
	}
	
	@RabbitListener(queues = "${rabbitmq.bookmarkQueue}")
	public void recievedMessage(BookmarkMessage message) {
		System.out.println("Recieved Message From RabbitMQ: " + message.getGifId());
		Giph giph = new Giph();
		giph.setGifId(message.getGifId());
		
		//Save to recommeded.
		this.giphRecommenderService.addRecommendedGiph(giph);
	}

}

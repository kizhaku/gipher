package com.stackroute.giphermanager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.giphermanager.exception.BookmarkExistException;
import com.stackroute.giphermanager.model.BookmarkMessage;
import com.stackroute.giphermanager.model.GiphBookmark;
import com.stackroute.giphermanager.service.GiphBookmarkService;
import com.stackroute.giphermanager.service.MessageQueueServiceImpl;
import com.stackroute.giphermanager.service.MessageQueueService;

@RestController
@RequestMapping("/giphermanager")
@CrossOrigin(origins="*", allowedHeaders="*")
public class GiphBookmarkController {
	
	private GiphBookmarkService giphBookmarkService;
	
	@Autowired
	private MessageQueueServiceImpl rabbitSender;
	
	@Autowired
	public GiphBookmarkController(GiphBookmarkService giphBookmarkService) {
		this.giphBookmarkService = giphBookmarkService;
	}
	
	@PostMapping("/api/v1/bookmark")
	public ResponseEntity<?> saveBookmark(@RequestBody GiphBookmark giphBookmark){	
		
		try {
			GiphBookmark savedBookmark = this.giphBookmarkService.saveBookmark(giphBookmark);
			
			BookmarkMessage mqMessage = new BookmarkMessage();
			mqMessage.setGifId(giphBookmark.getGifId());
			mqMessage.setUserName(giphBookmark.getUserName());		
			this.rabbitSender.send(mqMessage);
			
			return new ResponseEntity<GiphBookmark>(savedBookmark, HttpStatus.CREATED);
		} catch(BookmarkExistException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/api/v1/bookmark/{username}")
	public ResponseEntity<List<GiphBookmark>> getBookmarksByUsername(@PathVariable("username") String userName){	
		
		List<GiphBookmark> bookmarks = this.giphBookmarkService.getBookmarksByUsername(userName);
		
		return new ResponseEntity<List<GiphBookmark>>(bookmarks, HttpStatus.OK);
	}

}

package com.stackroute.giphermanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.giphermanager.exception.BookmarkDoesNotExistException;
import com.stackroute.giphermanager.exception.BookmarkExistException;
import com.stackroute.giphermanager.model.GiphBookmark;
import com.stackroute.giphermanager.repository.GiphBookmarkRepository;

@Service
public class GiphBookmarkServiceImpl implements GiphBookmarkService {
	
	GiphBookmarkRepository giphUserRepository;
	
	@Autowired
	public GiphBookmarkServiceImpl(GiphBookmarkRepository giphUserRepository) {
		this.giphUserRepository = giphUserRepository;
	}

	@Override
	public GiphBookmark saveBookmark(GiphBookmark giphBookmark) throws BookmarkExistException {
		
		if(!isBookmarkPresent(giphBookmark.getUserName(), giphBookmark.getGifId())) {
			return this.giphUserRepository.insert(giphBookmark);
		}
		else {
			throw new BookmarkExistException("Bookmark already exists");
		}
	}

	@Override
	public List<GiphBookmark> getBookmarksByUsername(String userName) {

		return giphUserRepository.findByuserName(userName);
	}

	@Override
	public boolean isBookmarkPresent(String userName, String gifId) {
		
		GiphBookmark savedBookmark = this.giphUserRepository.findByUserNameAndGifId(userName, gifId);
		
		if(savedBookmark != null) {
			return true;
		}
		
		return false;
	}

	@Override
	public boolean deleteBookmark(String userName, String gifId) throws BookmarkDoesNotExistException {
		//Check bookmark exists.
		if(isBookmarkPresent(userName, gifId)) {
			giphUserRepository.deleteGiphBookmarkByUserNameAndGifId(userName, gifId);
			
			return true;
		} 
		else {
			throw new BookmarkDoesNotExistException("Bookmark not found");
		}

	}

}

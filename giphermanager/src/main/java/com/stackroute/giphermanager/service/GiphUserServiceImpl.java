package com.stackroute.giphermanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.giphermanager.exception.BookmarkExistException;
import com.stackroute.giphermanager.model.GiphBookmark;
import com.stackroute.giphermanager.repository.GiphBookmarkRepository;

@Service
public class GiphUserServiceImpl implements GiphBookmarkService {
	
	GiphBookmarkRepository giphUserRepository;
	
	@Autowired
	public GiphUserServiceImpl(GiphBookmarkRepository giphUserRepository) {
		this.giphUserRepository = giphUserRepository;
	}

	@Override
	public GiphBookmark saveBookmark(GiphBookmark giphBookmark) throws BookmarkExistException {
		
		if(!isBookmarkPresent(giphBookmark)) {
			GiphBookmark savedBookmark = this.giphUserRepository.insert(giphBookmark);
		}
		else {
			throw new BookmarkExistException("Bookmark already exists");
		}
		
		return giphBookmark;
	}

	@Override
	public List<GiphBookmark> getBookmarksByUsername(String userName) {

		return giphUserRepository.findByuserName(userName);
	}

	@Override
	public boolean isBookmarkPresent(GiphBookmark giphBookmark) {
		
		GiphBookmark savedBookmark = this.giphUserRepository.findByUserNameAndGifId(giphBookmark.getUserName(), giphBookmark.getGifId());
		
		if(savedBookmark != null) {
			return true;
		}
		
		return false;
	}

}

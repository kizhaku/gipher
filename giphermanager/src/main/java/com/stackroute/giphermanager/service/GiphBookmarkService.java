package com.stackroute.giphermanager.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.stackroute.giphermanager.exception.BookmarkExistException;
import com.stackroute.giphermanager.model.GiphBookmark;

@Service
public interface GiphBookmarkService {
	
	GiphBookmark saveBookmark(GiphBookmark giphBookmark) throws BookmarkExistException;
	List<GiphBookmark> getBookmarksByUsername(String userName);
	boolean isBookmarkPresent(GiphBookmark giphBookmark);
}

package com.stackroute.giphermanager.test.service;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.stackroute.giphermanager.exception.BookmarkDoesNotExistException;
import com.stackroute.giphermanager.exception.BookmarkExistException;
import com.stackroute.giphermanager.model.GiphBookmark;
import com.stackroute.giphermanager.repository.GiphBookmarkRepository;
import com.stackroute.giphermanager.service.GiphBookmarkServiceImpl;

public class GiphBookmarkServiceTest {
	
	@Mock
	private GiphBookmarkRepository giphUserRepository;
	@InjectMocks
	private GiphBookmarkServiceImpl giphBookmarkServiceImpl;
	private GiphBookmark giphBookmark;
	
	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		giphBookmark = new GiphBookmark();
		giphBookmark.setId("123");
		giphBookmark.setGifId("gif_123_unittest");
		giphBookmark.setUserName("admin");
	}
	
	
	@Test
	public void testSaveBookmarkSuccess() throws Exception{
		Mockito.when(giphUserRepository.findByUserNameAndGifId(giphBookmark.getUserName(), giphBookmark.getGifId()))
		.thenReturn(null);
		Mockito.when(giphUserRepository.insert(giphBookmark)).thenReturn(giphBookmark);
		
		GiphBookmark savedBookMark = giphBookmarkServiceImpl.saveBookmark(giphBookmark);
		Assert.assertEquals(giphBookmark, savedBookMark);
	}
	
	@Test(expected = BookmarkExistException.class)
	public void testSaveBookmarkFailure() throws Exception{
		Mockito.when(giphUserRepository.findByUserNameAndGifId(giphBookmark.getUserName(), giphBookmark.getGifId()))
		.thenReturn(giphBookmark);
		Mockito.when(giphUserRepository.insert(giphBookmark)).thenReturn(giphBookmark);
		
		GiphBookmark savedBookMark = giphBookmarkServiceImpl.saveBookmark(giphBookmark);
		Assert.assertEquals(giphBookmark, savedBookMark);
	}
	
	@Test
	public void testDeleteBookmarkSuccess() throws Exception{
		Mockito.when(giphUserRepository.findByUserNameAndGifId(giphBookmark.getUserName(), giphBookmark.getGifId()))
		.thenReturn(giphBookmark);
		Mockito.when(giphUserRepository.deleteGiphBookmarkByUserNameAndGifId(giphBookmark.getUserName(), giphBookmark.getGifId()))
		.thenReturn((long) 1);
		
		boolean status = giphBookmarkServiceImpl.deleteBookmark(giphBookmark.getUserName(), giphBookmark.getGifId());
		
		Assert.assertEquals(true, status);
		
	}
	
	@Test(expected = BookmarkDoesNotExistException.class)
	public void testDeleteBookmarkFailure() throws Exception{
		Mockito.when(giphUserRepository.findByUserNameAndGifId(giphBookmark.getUserName(), giphBookmark.getGifId()))
		.thenReturn(null);
		
		boolean status = giphBookmarkServiceImpl.deleteBookmark(giphBookmark.getUserName(), giphBookmark.getGifId());
		
		Assert.assertEquals(false, status);
		
	}

}

package com.stackroute.giphermanager.test.repository;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.stackroute.giphermanager.model.GiphBookmark;
import com.stackroute.giphermanager.repository.GiphBookmarkRepository;

@RunWith(SpringRunner.class)
@DataMongoTest
public class GiphBookmarkRepositoryTest {
	
	@Autowired
	private GiphBookmarkRepository giphBookmarkRepository;
	GiphBookmark giphBookmark;
	Optional<GiphBookmark> optionalGiphBookmark;
	
	@Before
	public void SetUp() {
		giphBookmark = new GiphBookmark();
		giphBookmark.setId("123");
		giphBookmark.setGifId("gif_123_unittest");
		giphBookmark.setUserName("admin");
		optionalGiphBookmark = Optional.of(giphBookmark);
	}
	
	@After
	public void tearDown() {
		giphBookmarkRepository.deleteAll();
	}
	
	@Ignore
	@Test
	public void testCreateBookmark() {
		giphBookmarkRepository.insert(giphBookmark);
		GiphBookmark savedBookmark = giphBookmarkRepository.findById(giphBookmark.getId()).get();
		
		Assert.assertEquals(giphBookmark.getGifId(), savedBookmark.getGifId());
	}
	
	@Ignore
	@Test(expected = NoSuchElementException.class)
	public void testDeleteBookmark() {
		giphBookmarkRepository.insert(giphBookmark);
		GiphBookmark savedBookmark = giphBookmarkRepository.findById(giphBookmark.getId()).get();
		
		Assert.assertEquals(giphBookmark.getGifId(), savedBookmark.getGifId());
		
		giphBookmarkRepository.delete(savedBookmark);
		giphBookmarkRepository.findById(giphBookmark.getId()).get();
	}
	
	@Ignore
	@Test(expected = NoSuchElementException.class)
	public void testDeleteGiphBookmarkByUserNameAndGifId() {
		giphBookmarkRepository.insert(giphBookmark);
		GiphBookmark savedBookmark = giphBookmarkRepository.findById(giphBookmark.getId()).get();
		
		Assert.assertEquals(giphBookmark.getGifId(), savedBookmark.getGifId());
		
		giphBookmarkRepository.deleteGiphBookmarkByUserNameAndGifId(giphBookmark.getUserName(), giphBookmark.getGifId());
		giphBookmarkRepository.findById(giphBookmark.getId()).get();
	}
	
	@Ignore
	@Test
	public void testFindByUserNameAndGifId() {
		giphBookmarkRepository.insert(giphBookmark);
		GiphBookmark savedBookmark = giphBookmarkRepository.findByUserNameAndGifId(giphBookmark.getUserName(), giphBookmark.getGifId());
		
		Assert.assertEquals(giphBookmark.getGifId(), savedBookmark.getGifId());
	}
}

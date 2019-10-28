package com.stackroute.gipherrecommendersystem.test.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.stackroute.gipherrecommendersystem.model.Giph;
import com.stackroute.gipherrecommendersystem.repository.GiphRecommenderRepository;

@RunWith(SpringRunner.class)
@DataMongoTest
public class GiphRecommenderRepositoryTest {
	
	@Autowired
	private GiphRecommenderRepository giphRecommenderRepository;
	Giph giph;
	Giph giph2;
	Optional<Giph> optionalOfGiph;
	List<Giph> giphs;
	
	@Before
	public void SetUp() {
		giph = new Giph();
		giph.setGifId("123");
		giph.setCount(2);
		optionalOfGiph = Optional.of(giph);
		
		giph2 = new Giph();
		giph2.setGifId("1234");
		giph2.setCount(3);
		
		giphs = new ArrayList<Giph>();
		giphs.add(giph);
		giphs.add(giph2);
	}
	
	@After
	public void tearDown() {
		giphRecommenderRepository.deleteAll();
	}
	
	@Test
	public void testCreateRecommendedGiph() {
		giphRecommenderRepository.insert(giph);
		Giph savedGiph = giphRecommenderRepository.findById(giph.getGifId()).get();
		
		Assert.assertEquals(giph.getGifId(), savedGiph.getGifId());
	}
	
	@Test(expected = NoSuchElementException.class)
	public void testDeleteRecommendedGiph() {
		giphRecommenderRepository.insert(giph);
		
		Giph savedGiph = giphRecommenderRepository.findById(giph.getGifId()).get();		
		Assert.assertEquals(giph.getGifId(), savedGiph.getGifId());
		giphRecommenderRepository.delete(giph);
		giphRecommenderRepository.findById(giph.getGifId()).get();
	}
	
	@Test
	public void testFindTop20ByOrderByCountDesc() {
		giphRecommenderRepository.insert(giph);
		giphRecommenderRepository.insert(giph2);
		
		List<Giph> recommendedGiphs = giphRecommenderRepository.findTop20ByOrderByCountDesc();
		
		//Giph with highest count placed first.
		Assert.assertEquals(giphs.get(1).getGifId(), recommendedGiphs.get(0).getGifId());
		Assert.assertEquals(giphs.get(0).getGifId(), recommendedGiphs.get(1).getGifId());
	}

}

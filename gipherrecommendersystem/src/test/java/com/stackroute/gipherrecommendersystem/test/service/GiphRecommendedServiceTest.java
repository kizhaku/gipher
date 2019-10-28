package com.stackroute.gipherrecommendersystem.test.service;

import java.util.Optional;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.stackroute.gipherrecommendersystem.exception.GiphNotFoundException;
import com.stackroute.gipherrecommendersystem.model.Giph;
import com.stackroute.gipherrecommendersystem.repository.GiphRecommenderRepository;
import com.stackroute.gipherrecommendersystem.service.GiphRecommenderServiceImpl;


public class GiphRecommendedServiceTest {
	
	@Mock
	private GiphRecommenderRepository giphRecommenderRepository;
	@InjectMocks
	private GiphRecommenderServiceImpl giphRecommenderServiceImpl;
	Giph giph;
	Optional<Giph> optionalofGiph;
	
	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		giph = new Giph();
		giph.setGifId("123");
		giph.setCount(2);
		optionalofGiph =  Optional.of(giph);
	}
	
	@Test
	public void testAddRecommendedGiph() {
		Mockito.when(giphRecommenderRepository.findById(giph.getGifId())).thenReturn(Optional.empty());
		Mockito.when(giphRecommenderRepository.insert(giph)).thenReturn(giph);
		//Should insert when not present.	
		Giph insertedGiph = giphRecommenderServiceImpl.addRecommendedGiph(giph);
		Assert.assertEquals(giph.getGifId(), insertedGiph.getGifId());
		Assert.assertEquals(giph.getCount(), insertedGiph.getCount());
	}
	
	@Test
	public void testUpdateRecommendedGiph() {
		Mockito.when(giphRecommenderRepository.findById(giph.getGifId())).thenReturn(optionalofGiph);
		giph.setCount(giph.getCount() + 1);
		Mockito.when(giphRecommenderRepository.save(giph)).thenReturn(giph);
		//Should save when not present.	
		Giph insertedGiph = giphRecommenderServiceImpl.addRecommendedGiph(giph);
		Assert.assertEquals(giph.getGifId(), insertedGiph.getGifId());
		Assert.assertEquals(giph.getCount(), insertedGiph.getCount());
	}
	
	@Test
	public void testGetGiphByIdSuccess() throws Exception{
		Mockito.when(giphRecommenderRepository.findById(giph.getGifId())).thenReturn(optionalofGiph);
		Giph savedGiph = giphRecommenderServiceImpl.getGiphById(giph.getGifId());
		
		Assert.assertEquals(giph.getGifId(), savedGiph.getGifId());
	}
	
	@Test(expected = GiphNotFoundException.class)
	public void testGetGiphByIdFailure() throws Exception{
		Mockito.when(giphRecommenderRepository.findById(giph.getGifId())).thenReturn(Optional.empty());
		Giph savedGiph = giphRecommenderServiceImpl.getGiphById(giph.getGifId());
	}
	
	@Test
	public void testDeleteRecommendedGiphSuccess() {
		Mockito.when(giphRecommenderRepository.findById(giph.getGifId())).thenReturn(optionalofGiph);
		giph.setCount(giph.getCount() - 1);
		Mockito.when(giphRecommenderRepository.save(giph)).thenReturn(giph);
		giph.setCount(giph.getCount() + 1);
		
		boolean status = giphRecommenderServiceImpl.removeRecommendedGiph(giph);
		
		Assert.assertEquals(true, status);
	}
	
	@Test
	public void testDeleteRecommendedGiphFailure() {
		Mockito.when(giphRecommenderRepository.findById(giph.getGifId())).thenReturn(Optional.empty());
		
		boolean status = giphRecommenderServiceImpl.removeRecommendedGiph(giph);
		
		Assert.assertEquals(false, status);
	}
}

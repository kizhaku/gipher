package com.stackroute.gipherrecommendersystem.test.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.ws.rs.core.MediaType;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.stackroute.gipherrecommendersystem.controller.GiphRecommenderController;
import com.stackroute.gipherrecommendersystem.exception.GiphNotFoundException;
import com.stackroute.gipherrecommendersystem.model.Giph;
import com.stackroute.gipherrecommendersystem.service.GiphRecommenderService;

@RunWith(SpringRunner.class)
@WebMvcTest
public class GipherRecommenderControllerTest {
	
	@Autowired
	private MockMvc mockMvc;
	@MockBean
	private GiphRecommenderService giphRecommenderService;
	@InjectMocks
	private GiphRecommenderController giphRecommenderController;
	List<Giph> giphs;
	Giph giph;
	Giph giph2;
	
	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		mockMvc = MockMvcBuilders.standaloneSetup(giphRecommenderController).build();
		giph = new Giph();
		giph.setGifId("123");
		giph.setCount(2);
		
		giph2 = new Giph();
		giph2.setGifId("1234");
		giph2.setCount(3);
		
		giphs = new ArrayList<Giph>();
		giphs.add(giph);
		giphs.add(giph2);
	}
	
	@Test
	public void testGetRecommendedGiphsSuccess() throws Exception{
		Mockito.when(giphRecommenderService.getRecommendedGiphs()).thenReturn(giphs);
		
		mockMvc.perform(MockMvcRequestBuilders.get("/gipherrecommender/api/v1/giphs")
				.contentType(MediaType.APPLICATION_JSON))
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andDo(MockMvcResultHandlers.print());
		
	}
	
	@Test
	public void testGetRecommendedGiphsFailure() throws Exception{
		Mockito.when(giphRecommenderService.getRecommendedGiphs()).thenThrow(new GiphNotFoundException("Gif not found"));
		
		mockMvc.perform(MockMvcRequestBuilders.get("/gipherrecommender/api/v1/giphs")
				.contentType(MediaType.APPLICATION_JSON))
		.andExpect(MockMvcResultMatchers.status().isNotFound())
		.andDo(MockMvcResultHandlers.print());
		
	}
}

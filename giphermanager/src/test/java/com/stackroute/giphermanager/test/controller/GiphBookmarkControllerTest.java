package com.stackroute.giphermanager.test.controller;

import static org.mockito.ArgumentMatchers.any;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.giphermanager.controller.GiphBookmarkController;
import com.stackroute.giphermanager.exception.BookmarkDoesNotExistException;
import com.stackroute.giphermanager.exception.BookmarkExistException;
import com.stackroute.giphermanager.model.BookmarkMessage;
import com.stackroute.giphermanager.model.GiphBookmark;
import com.stackroute.giphermanager.service.GiphBookmarkService;
import com.stackroute.giphermanager.service.MessageQueueServiceImpl;

@RunWith(SpringRunner.class)
@WebMvcTest
public class GiphBookmarkControllerTest {
	
	@Autowired
	private MockMvc mockMvc;
	@MockBean
	private GiphBookmarkService giphBookmarkService;
	@MockBean
	private MessageQueueServiceImpl rabbitSender;
	@InjectMocks
	private GiphBookmarkController giphBookmarkController;
	private GiphBookmark giphBookmark;
	private BookmarkMessage mqMessage;
	private GiphBookmark giphBookmark2;
	
	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		mockMvc = MockMvcBuilders.standaloneSetup(giphBookmarkController).build();
		giphBookmark = new GiphBookmark();
		giphBookmark.setId("123");
		giphBookmark.setGifId("gif_123_unittest");
		giphBookmark.setUserName("admin");
		
		mqMessage = new BookmarkMessage();
		mqMessage.setGifId(giphBookmark.getGifId());
		mqMessage.setUserName(giphBookmark.getUserName());
		mqMessage.setStatus("add");
	}
	
	@Test
	public void testSaveBookmarkSuccess() throws Exception{
		Mockito.when(giphBookmarkService.saveBookmark(giphBookmark)).thenReturn(giphBookmark);
		Mockito.doNothing().when(rabbitSender).send(mqMessage);
		
		mockMvc.perform(MockMvcRequestBuilders.post("/giphermanager/api/v1/bookmark")
				.contentType(MediaType.APPLICATION_JSON)
				.content(jsonToString(giphBookmark)))
		.andExpect(MockMvcResultMatchers.status().isCreated());
	}
	
	@Test
	public void testSaveBookmarkFailure() throws Exception{
		Mockito.when(giphBookmarkService.saveBookmark(any())).thenThrow(new BookmarkExistException("Error"));
		Mockito.doNothing().when(rabbitSender).send(mqMessage);
		
		mockMvc.perform(MockMvcRequestBuilders.post("/giphermanager/api/v1/bookmark")
				.contentType(MediaType.APPLICATION_JSON)
				.content(jsonToString(giphBookmark)))
		.andExpect(MockMvcResultMatchers.status().isConflict());
	}
	
	@Test
	public void testDeleteBookmarkSuccess() throws Exception{
		Mockito.when(giphBookmarkService.deleteBookmark(giphBookmark.getUserName(), giphBookmark.getGifId()))
		.thenReturn(true);
		Mockito.doNothing().when(rabbitSender).send(mqMessage);
		
		mockMvc.perform(MockMvcRequestBuilders.delete("/giphermanager/api/v1/bookmark/admin/gif_123_unittest")
				.contentType(MediaType.APPLICATION_JSON)
				.content(jsonToString(giphBookmark)))
		.andExpect(MockMvcResultMatchers.status().isOk());
	}
	
	@Test
	public void testDeleteBookmarkFailure() throws Exception{
		Mockito.when(giphBookmarkService.deleteBookmark(giphBookmark.getUserName(), giphBookmark.getGifId()))
		.thenThrow(new BookmarkDoesNotExistException("Bookmark not found"));
		Mockito.doNothing().when(rabbitSender).send(mqMessage);
		
		mockMvc.perform(MockMvcRequestBuilders.delete("/giphermanager/api/v1/bookmark/admin/gif_123_unittest")
				.contentType(MediaType.APPLICATION_JSON)
				.content(jsonToString(giphBookmark)))
		.andExpect(MockMvcResultMatchers.status().isNotFound());
	}

    private static String jsonToString(final Object obj) throws JsonProcessingException {
        String result;
        try {
            final ObjectMapper mapper = new ObjectMapper();
            final String jsonContent = mapper.writeValueAsString(obj);
            result = jsonContent;
        } catch (JsonProcessingException e) {
        	e.printStackTrace();
            result = "Json processing error";
        }
        return result;
    }
}

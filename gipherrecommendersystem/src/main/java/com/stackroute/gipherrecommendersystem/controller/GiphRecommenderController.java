package com.stackroute.gipherrecommendersystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.gipherrecommendersystem.model.Giph;
import com.stackroute.gipherrecommendersystem.service.GiphRecommenderService;

@RestController
@RequestMapping("/gipherrecommender")
@CrossOrigin(origins="*", allowedHeaders="*")
public class GiphRecommenderController {
	
	private GiphRecommenderService giphRecommenderService;
	
	@Autowired
	public GiphRecommenderController(GiphRecommenderService giphRecommenderService) {
		this.giphRecommenderService = giphRecommenderService;
	}
	
	@GetMapping("/api/v1/giphs")
	public ResponseEntity<?> getRecommendedGiphs(){	
		
		try {
			List<Giph> giphs = this.giphRecommenderService.getRecommendedGiphs();
			
			return new ResponseEntity<List<Giph>>(giphs, HttpStatus.OK);
		} catch(Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

}

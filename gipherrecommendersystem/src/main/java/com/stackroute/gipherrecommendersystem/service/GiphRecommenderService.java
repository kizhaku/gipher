package com.stackroute.gipherrecommendersystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.stackroute.gipherrecommendersystem.exception.GiphNotFoundException;
import com.stackroute.gipherrecommendersystem.model.Giph;

@Service
public interface GiphRecommenderService {
	
	public Giph addRecommendedGiph(Giph giph);
	public Giph getGiphById(String id) throws GiphNotFoundException;
	public List<Giph> getRecommendedGiphs() throws GiphNotFoundException;
	public boolean removeRecommendedGiph(Giph giph);
}

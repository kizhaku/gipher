package com.stackroute.gipherrecommendersystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.gipherrecommendersystem.exception.GiphNotFoundException;
import com.stackroute.gipherrecommendersystem.model.Giph;
import com.stackroute.gipherrecommendersystem.repository.GiphRecommenderRepository;

@Service
public class GiphRecommenderServiceImpl implements GiphRecommenderService {
	
	private GiphRecommenderRepository giphRecommenderRepository;
	
	@Autowired
	public GiphRecommenderServiceImpl(GiphRecommenderRepository giphRecommenderRepository) {
		this.giphRecommenderRepository = giphRecommenderRepository;
	}
	
	@Override
	public Giph addRecommendedGiph(Giph giph) {
		//Check if giph already exists. Update count if present.
		try{
			Giph existingGiph = getGiphById(giph.getGifId());
			giph.setCount(existingGiph.getCount().intValue() + 1);
			
			return giphRecommenderRepository.save(giph);
			
		} catch(GiphNotFoundException e) {
			//Add new giph.
			return giphRecommenderRepository.insert(giph);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@Override
	public Giph getGiphById(String id) throws GiphNotFoundException{
		Optional<Giph> optional = this.giphRecommenderRepository.findById(id);
		
		if(!optional.isPresent()) {
			throw new GiphNotFoundException("Not found");
		}
		
		return optional.get();
	}

	@Override
	public List<Giph> getRecommendedGiphs() throws GiphNotFoundException{
		List<Giph> giphs = this.giphRecommenderRepository.findTop20ByOrderByCountDesc();
		
		if(giphs == null) {
			throw new GiphNotFoundException("No gifs found");
		}
		
		return giphs;
	}

	@Override
	public boolean removeRecommendedGiph(Giph giph) {
		try{
			Giph existingGiph = getGiphById(giph.getGifId());
			
			if(existingGiph.getCount().intValue() == 1) {
				giphRecommenderRepository.delete(giph);
			}
			else {
				giph.setCount(existingGiph.getCount().intValue() - 1);
				giphRecommenderRepository.save(giph);
			}
			
			return true;
			
		} catch (GiphNotFoundException e) {
			System.out.println(e.getMessage());
			return false;
		}
	}

}

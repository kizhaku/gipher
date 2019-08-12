package com.stackroute.gipherrecommendersystem.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.gipherrecommendersystem.model.Giph;


@Repository
public interface GiphRecommenderRepository extends MongoRepository<Giph, String> {
	
	public List<Giph> findTop20ByOrderByCountDesc();

}

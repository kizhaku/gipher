package com.stackroute.giphermanager.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.giphermanager.model.GiphBookmark;


@Repository
public interface GiphBookmarkRepository extends MongoRepository<GiphBookmark, String>{
	
	public List<GiphBookmark> findByuserName(String userName);
	public GiphBookmark findByUserNameAndGifId(String userName, String gifId);
	public Long deleteGiphBookmarkByUserNameAndGifId(String userName, String gifId);

}

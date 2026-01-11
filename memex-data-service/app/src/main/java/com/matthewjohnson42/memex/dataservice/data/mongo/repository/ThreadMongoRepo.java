package com.matthewjohnson42.memex.dataservice.data.mongo.repository;

import com.matthewjohnson42.memex.data.repository.Repository;
import com.matthewjohnson42.memex.dataservice.data.enumeration.ThreadStatus;
import com.matthewjohnson42.memex.dataservice.data.mongo.entity.ThreadMongo;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ThreadMongoRepo extends MongoRepository<ThreadMongo, Integer>, Repository<ThreadMongo, Integer> {
    List<ThreadMongo> getAllByStatus(ThreadStatus status);
}

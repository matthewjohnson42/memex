package com.matthewjohnson42.memex.service.data.mongo.repository;

import com.matthewjohnson42.memex.data.entity.mongo.RawTextMongo;
import com.matthewjohnson42.memex.data.repository.mongo.RawTextMongoRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDateTime;

/**
 * Data access object for the Mongo collection corresponding to the RawText entity described by RawTextMongo
 */
public interface RawTextMongoRepoInstance extends RawTextMongoRepo {

    @Query("{createDateTime: {$gt: ?0, $lt: ?1}}")
    Page<RawTextMongo> getByCreateDateTimeRange(LocalDateTime startCreateDate, LocalDateTime endCreateDate, Pageable pageable);

}

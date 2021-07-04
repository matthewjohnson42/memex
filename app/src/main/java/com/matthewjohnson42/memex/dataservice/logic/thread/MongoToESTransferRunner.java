package com.matthewjohnson42.memex.dataservice.logic.thread;

import com.matthewjohnson42.memex.data.converter.DtoEntityConverter;
import com.matthewjohnson42.memex.data.dto.DtoForEntity;
import com.matthewjohnson42.memex.data.entity.Entity;
import com.matthewjohnson42.memex.data.repository.elasticsearch.ElasticRestTemplate;
import com.matthewjohnson42.memex.dataservice.data.enumeration.ThreadStatus;
import com.matthewjohnson42.memex.dataservice.data.mongo.service.ThreadMongoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Class that implements logic for loading Mongo data (source for truth) to ElasticSearch.
 *
 * @param <ID> the ID type of the data being transferred
 * @param <D>  the DTO type of the data being transferred
 * @param <M>  the Mongo Entity type of the data being transferred
 * @param <E>  the Elasticsearch Entity type of the data being transferred
 */
public class MongoToESTransferRunner<ID, D extends DtoForEntity<ID>, M extends Entity<ID>, E extends Entity<ID>> extends MemexDataServiceRunnable {
    private final Logger logger = LoggerFactory.getLogger(MongoToESTransferRunner.class);
    private final MongoRepository<M, String> mongoRepository;
    private final DtoEntityConverter<ID, D, M> mongoDtoConverter;
    private final ElasticRestTemplate<ID, E> elasticRestTemplate;
    private final DtoEntityConverter<ID, D, E> elasticsearchConverter;
    private final int totalCount;

    /**
     * @param mongoRepository        the Repository object for the Mongo entity
     * @param mongoDtoConverter      the DtoEntityConverter for the Mongo entity
     * @param elasticRestTemplate    the Repository object for the ElasticSearch entity
     * @param elasticsearchConverter the DtoEntityConverter for the ElasticSearch entity
     * @param batchSize              number of records to transfer per mongo transaction (transaction binding not guaranteed)
     */
    public MongoToESTransferRunner(ThreadMongoService threadMongoService,
                                   MongoRepository mongoRepository,
                                   DtoEntityConverter mongoDtoConverter,
                                   ElasticRestTemplate elasticRestTemplate,
                                   DtoEntityConverter elasticsearchConverter,
                                   int batchSize) {
        super(threadMongoService, batchSize);
        this.mongoRepository = mongoRepository;
        this.elasticRestTemplate = elasticRestTemplate;
        this.mongoDtoConverter = mongoDtoConverter;
        this.elasticsearchConverter = elasticsearchConverter;
        this.batchesProcessed = 0;
        this.totalCount = (int) mongoRepository.count();
    }

    public boolean executeBatch() {
        Page<M> mongoPage = mongoRepository.findAll(PageRequest.of(batchesProcessed, batchSize));
        List<E> esEntities = new ArrayList<>();
        if (mongoPage != null) {
            mongoPage.getContent().forEach(mongoEntity -> {
                D dto = mongoDtoConverter.convertEntity(mongoEntity);
                E esEntity = elasticsearchConverter.convertDto(dto);
                esEntity.setCreateDateTime(LocalDateTime.now());
                esEntity.setUpdateDateTime(LocalDateTime.now());
                esEntities.add(esEntity);
            });
        }
        esEntities.stream().forEach(esEntity -> {
            elasticRestTemplate.save(esEntity);
        });
        batchesProcessed++;
        return batchesProcessed >= (totalCount / batchSize) + 1;
    }

    public void updateRun() {
        threadMongoService.updateThreadEntity(hashCode(), batchesProcessed, ThreadStatus.RUNNING);
    }

    public int getTotalCount() {
        return totalCount;
    }
}

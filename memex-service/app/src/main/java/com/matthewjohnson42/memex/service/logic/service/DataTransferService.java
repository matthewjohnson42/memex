package com.matthewjohnson42.memex.service.logic.service;

import com.matthewjohnson42.memex.data.converter.DtoEntityConverter;
import com.matthewjohnson42.memex.data.converter.RawTextESConverter;
import com.matthewjohnson42.memex.data.converter.RawTextMongoConverter;
import com.matthewjohnson42.memex.data.dto.DtoForEntity;
import com.matthewjohnson42.memex.data.dto.RawTextDto;
import com.matthewjohnson42.memex.data.entity.Entity;
import com.matthewjohnson42.memex.data.entity.elasticsearch.RawTextES;
import com.matthewjohnson42.memex.data.entity.mongo.RawTextMongo;
import com.matthewjohnson42.memex.data.repository.elasticsearch.ElasticRestTemplate;
import com.matthewjohnson42.memex.data.repository.elasticsearch.RawTextESRestTemplate;
import com.matthewjohnson42.memex.data.repository.mongo.RawTextMongoRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Service that implements data transfer logic between Repositories.
 * @see com.matthewjohnson42.memex.data.repository.Repository
 */
@Service
public class DataTransferService implements ApplicationContextAware {

    ApplicationContext applicationContext;

    public void setApplicationContext(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    public void transferRawTextToES() {
        new MongoToEsTranferrer<String, RawTextDto, RawTextMongo, RawTextES>(
                applicationContext.getBean(RawTextMongoRepo.class),
                applicationContext.getBean(RawTextMongoConverter.class),
                applicationContext.getBean(RawTextESRestTemplate.class),
                applicationContext.getBean(RawTextESConverter.class),
                1000
        ).run();
    }

    /**
     * Class that implements logic for loading Mongo data (source for truth) to ElasticSearch.
     * @param <ID> the ID type of the data being transferred
     * @param <D> the DTO type of the data being transferred
     * @param <M> the Mongo Entity type of the data being transferred
     * @param <E> the Elasticsearch Entity type of the data being transferred
     */
    private class MongoToEsTranferrer<ID, D extends DtoForEntity<ID>, M extends Entity<ID>, E extends Entity<ID>> {
        Logger logger = LoggerFactory.getLogger(MongoToEsTranferrer.class);
        private MongoRepository<M, String> mongoRepository;
        private DtoEntityConverter<ID, D, M> mongoDtoConverter;
        private ElasticRestTemplate<ID, E> elasticRestTemplate;
        private DtoEntityConverter<ID, D, E> elasticsearchConverter;
        private int batchSize;

        /**
         * @param mongoRepository the Repository object for the Mongo entity
         * @param mongoDtoConverter the DtoEntityConverter for the Mongo entity
         * @param elasticRestTemplate the Repository object for the ElasticSearch entity
         * @param elasticsearchConverter the DtoEntityConverter for the ElasticSearch entity
         * @param batchSize number of records to transfer per mongo transaction (transaction binding not guaranteed)
         */
        public MongoToEsTranferrer(MongoRepository mongoRepository,
                                   DtoEntityConverter mongoDtoConverter,
                                   ElasticRestTemplate elasticRestTemplate,
                                   DtoEntityConverter elasticsearchConverter,
                                   int batchSize) {
            this.mongoRepository = mongoRepository;
            this.elasticRestTemplate = elasticRestTemplate;
            this.mongoDtoConverter = mongoDtoConverter;
            this.elasticsearchConverter = elasticsearchConverter;
            this.batchSize = batchSize;
        }

        public void run() {
            int mongoRequestRetryLimit = 10;
            long totalDocuments = mongoRepository.count();
            long totalPages = totalDocuments / batchSize;
            List<Long> pageNumbers = new ArrayList<>();
            for (long i = 0; i <= totalPages; i++) {
                pageNumbers.add(i);
            }
            pageNumbers.stream().forEach(pageNumber -> {
                boolean pageRetrieved = false;
                int retryCount = 0;
                Page<M> mongoPage = null;
                while (!pageRetrieved && retryCount < mongoRequestRetryLimit) {
                    try {
                        mongoPage = mongoRepository.findAll(PageRequest.of(pageNumber.intValue(), batchSize));
                        pageRetrieved = true;
                    } catch (Exception e0) {
                        logger.info("Error when attempting to retrieve from Mongo", e0);
                        try {
                            Thread.sleep(1000);
                        } catch (Exception e1) {
                        }
                    }
                    retryCount++;
                }
                List<E> esEntities = new ArrayList<>();
                if (mongoPage != null) {
                    mongoPage.getContent().forEach(mongoEntity -> {
                        D dto = mongoDtoConverter.convertEntity(mongoEntity);
                        E esEntity = elasticsearchConverter.convertDto(dto);
                        esEntities.add(esEntity);
                    });
                }
                esEntities.stream().forEach(esEntity -> {
                    elasticRestTemplate.save(esEntity);
                });
            });
        }
    }

}

package com.matthewjohnson42.memex.dataservice.logic.service;

import com.matthewjohnson42.memex.data.converter.RawTextESConverter;
import com.matthewjohnson42.memex.data.converter.RawTextMongoConverter;
import com.matthewjohnson42.memex.data.dto.RawTextDto;
import com.matthewjohnson42.memex.data.entity.elasticsearch.RawTextES;
import com.matthewjohnson42.memex.data.entity.mongo.RawTextMongo;
import com.matthewjohnson42.memex.data.repository.elasticsearch.RawTextESRestTemplate;
import com.matthewjohnson42.memex.data.repository.mongo.RawTextMongoRepo;
import com.matthewjohnson42.memex.dataservice.logic.thread.MongoToESTransferRunner;
import com.matthewjohnson42.memex.dataservice.logic.thread.ThreadPool;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Service;

/**
 * Service that implements data transfer logic between Repositories.
 *
 * @see com.matthewjohnson42.memex.data.repository.Repository
 */
@Service
public class DataTransferService implements ApplicationContextAware {

    private ApplicationContext applicationContext;
    private final ThreadPool threadPool;

    public DataTransferService(ThreadPool threadPool) {
        this.threadPool = threadPool;
    }

    public void setApplicationContext(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    public void transferRawTextToES() {
        threadPool.execute(new MongoToESTransferRunner<String, RawTextDto, RawTextMongo, RawTextES>(
                applicationContext.getBean(RawTextMongoRepo.class),
                applicationContext.getBean(RawTextMongoConverter.class),
                applicationContext.getBean(RawTextESRestTemplate.class),
                applicationContext.getBean(RawTextESConverter.class),
                1000
        ));
    }

}

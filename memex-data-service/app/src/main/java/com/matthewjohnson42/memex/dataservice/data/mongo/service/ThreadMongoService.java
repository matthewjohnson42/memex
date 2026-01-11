package com.matthewjohnson42.memex.dataservice.data.mongo.service;

import com.matthewjohnson42.memex.data.service.DataService;
import com.matthewjohnson42.memex.dataservice.data.converter.ThreadMongoConverter;
import com.matthewjohnson42.memex.dataservice.data.dto.ThreadDto;
import com.matthewjohnson42.memex.dataservice.data.enumeration.ThreadStatus;
import com.matthewjohnson42.memex.dataservice.data.mongo.entity.ThreadMongo;
import com.matthewjohnson42.memex.dataservice.data.mongo.repository.ThreadMongoRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ThreadMongoService extends DataService<Integer, ThreadDto, ThreadMongo> {

    Logger logger = LoggerFactory.getLogger(ThreadMongoService.class);

    private final ThreadMongoRepo threadMongoRepo;

    public ThreadMongoService(ThreadMongoConverter threadMongoConverter, ThreadMongoRepo threadMongoRepo) {
        super(threadMongoConverter, threadMongoRepo);
        this.threadMongoRepo = threadMongoRepo;
    }

    public ThreadDto createThreadEntity(int threadHash, int batchesProcessed, int batchSize, int totalCount, String type) {
        ThreadDto threadDto = new ThreadDto()
                .setId(threadHash)
                .setBatchesProcessed(batchesProcessed)
                .setBatchSize(batchSize)
                .setStatus(ThreadStatus.PENDING_RUN)
                .setTotalCount(totalCount)
                .setType(type);
        return create(threadDto);
    }

    public ThreadDto updateThreadEntity(int threadHash, int batchesProcessed, ThreadStatus status) {
        ThreadDto threadDto = new ThreadDto()
                .setId(threadHash)
                .setBatchesProcessed(batchesProcessed)
                .setStatus(status);
        return update(threadDto);
    }

    public List<ThreadDto> getRunningThreads() {
        List<ThreadMongo> runningThreads = threadMongoRepo.getAllByStatus(ThreadStatus.RUNNING);
        List<ThreadDto> returnList = new ArrayList<>();
        for (ThreadMongo threadMongo : runningThreads) {
            returnList.add(converter.convertEntity(threadMongo));
        }
        return returnList;
    }

}

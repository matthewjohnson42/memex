package com.matthewjohnson42.memex.dataservice.data.converter;

import com.matthewjohnson42.memex.data.converter.DtoEntityConverter;
import com.matthewjohnson42.memex.dataservice.data.dto.ThreadDto;
import com.matthewjohnson42.memex.dataservice.data.mongo.entity.ThreadMongo;
import org.springframework.stereotype.Component;

@Component
public class ThreadMongoConverter implements DtoEntityConverter<Integer, ThreadDto, ThreadMongo> {

    public ThreadMongo convertDto(ThreadDto threadDto) {
        ThreadMongo threadMongo = new ThreadMongo();
        return threadMongo.setId(threadDto.getId())
                .setBatchesProcessed(threadDto.getBatchesProcessed())
                .setBatchSize(threadDto.getBatchSize())
                .setTotalCount(threadDto.getTotalCount())
                .setType(threadDto.getType());
    }

    public ThreadDto convertEntity(ThreadMongo threadMongo) {
        ThreadDto threadDto = new ThreadDto();
        return threadDto.setId(threadMongo.getId())
                .setBatchesProcessed(threadMongo.getBatchesProcessed())
                .setBatchSize(threadMongo.getBatchSize())
                .setTotalCount(threadMongo.getTotalCount())
                .setType(threadMongo.getType());
    }

    public ThreadMongo updateFromDto(ThreadMongo threadMongo, ThreadDto threadDto) {
        return threadMongo.setBatchesProcessed(threadDto.getBatchesProcessed())
                .setStatus(threadDto.getStatus());
    }

    public ThreadDto updateFromEntity(ThreadDto threadDto, ThreadMongo threadMongo) {
        return threadDto.setBatchesProcessed(threadMongo.getBatchesProcessed())
                .setBatchSize(threadMongo.getBatchSize())
                .setTotalCount(threadMongo.getTotalCount())
                .setType(threadMongo.getType());
    }

}

package com.matthewjohnson42.memex.dataservice.logic.thread;

import com.google.api.services.drive.Drive;
import com.matthewjohnson42.memex.data.converter.DtoEntityConverter;
import com.matthewjohnson42.memex.data.dto.DtoForEntity;
import com.matthewjohnson42.memex.data.entity.Entity;
import com.matthewjohnson42.memex.dataservice.data.enumeration.ThreadStatus;
import com.matthewjohnson42.memex.dataservice.data.mongo.service.ThreadMongoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.repository.MongoRepository;

public class MongoToGoogleDriveTransferRunner<ID, D extends DtoForEntity<ID>, E extends Entity<ID>>
        extends MemexDataServiceRunnable {

    Logger logger = LoggerFactory.getLogger(MongoToGoogleDriveTransferRunner.class);

    private final MongoRepository<E, ID> mongoRepository;
    private final DtoEntityConverter<ID, D, E> mongoDtoConverter;
    private final Drive drive;

    private final int totalCount;

    public MongoToGoogleDriveTransferRunner(ThreadMongoService threadMongoService,
                                            MongoRepository<E, ID> mongoRepository,
                                            DtoEntityConverter<ID, D, E> mongoDtoConverter,
                                            Drive drive,
                                            int batchSize) {
        super(threadMongoService, batchSize);
        this.mongoRepository = mongoRepository;
        this.mongoDtoConverter = mongoDtoConverter;
        this.drive = drive;
        this.totalCount = (int) mongoRepository.count();
    }

    public boolean executeBatch() {
        try {
            logger.info(drive.about().get().setFields("*").execute().toString());
            logger.info(drive.files().list().execute().getFiles().toString());
        } catch (Exception e) {
            logger.error("Error when accessing Drive info", e);
        }
        return true;
    }

    public void updateRun() {
        threadMongoService.updateThreadEntity(hashCode(), 0, ThreadStatus.RUNNING);
    }

    public int getTotalCount() {
        return totalCount;
    }
}

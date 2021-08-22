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

    @Override
    protected void setupRun() {
        super.setupRun();
        // iteratively copy all rawText using pageable, write to temp file
            // update ThreadMongo to include attribute "description", include temp file name in description
        // get total bytes in file
        // set batch number to batches of 1 MB
        // create file on Google Drive
    }

    public boolean executeBatch() {
        // confirm previous batch was successful; if not, re-run batch
        // retrieve bytes from file, send HTTP request with bytes as content
        return false;
    }

    public void updateRun() {
        threadMongoService.updateThreadEntity(hashCode(), batchesProcessed, ThreadStatus.RUNNING);
        batchesProcessed = batchesProcessed + 1;
    }

    @Override
    protected void cleanupRun() {
        // delete file from disk
    }

    public int getTotalCount() {
        return totalCount;
    }
}

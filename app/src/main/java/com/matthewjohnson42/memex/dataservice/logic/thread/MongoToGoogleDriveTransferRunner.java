package com.matthewjohnson42.memex.dataservice.logic.thread;

import com.google.api.services.drive.Drive;
import com.matthewjohnson42.memex.data.converter.DtoEntityConverter;
import com.matthewjohnson42.memex.data.dto.DtoForEntity;
import com.matthewjohnson42.memex.data.entity.Entity;
import com.matthewjohnson42.memex.dataservice.data.enumeration.ThreadStatus;
import com.matthewjohnson42.memex.dataservice.data.mongo.service.ThreadMongoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.Instant;

public class MongoToGoogleDriveTransferRunner<ID, D extends DtoForEntity<ID>, E extends Entity<ID>>
        extends MemexDataServiceRunnable {

    Logger logger = LoggerFactory.getLogger(MongoToGoogleDriveTransferRunner.class);

    private final MongoRepository<E, ID> mongoRepository;
    private final DtoEntityConverter<ID, D, E> mongoDtoConverter;
    private final Drive drive;
    private final File tempFile;

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
        this.tempFile = new File(String.format("mongo-to-drive-transfer-temp-file-%s-%s.tmp", Instant.now().getEpochSecond(), this.hashCode()));
    }

    @Override
    protected void setupRun() {
        super.setupRun();
        // iteratively copy all rawText using pageable, write to temp file
            // update ThreadMongo to include attribute "description", include temp file name in description
        FileOutputStream fos;
        try {
            fos = new FileOutputStream(tempFile);
        } catch (IOException e) {
            throw new RuntimeException(String.format("Could not open file %s", tempFile.getAbsolutePath()));
        }
        PrintWriter writer = new PrintWriter(fos, true);
        final int pageSize = 100;
        final long pagesToWrite = mongoRepository.count() / pageSize;
        for (int i = 0; i <= pagesToWrite; i++) {
            Pageable pageable = PageRequest.of(i, pageSize, Sort.Direction.ASC, "createDateTime");
            Page<E> page = mongoRepository.findAll(pageable);
            for(E entity: page.getContent()) {
                writer.println(entity.toString()); // todo need to add JSON generation, confirm JSON can be read in by Mongo
            }
            logger.info("Wrote page {} of {}", i + 1, pagesToWrite + 1);
        }
        writer.close();
        // get total bytes in file
        // set batch number to batches of 1 MB
        // create file on Google Drive
    }

    public boolean executeBatch() {
        // confirm previous batch was successful; if not, re-run batch
        // retrieve bytes from file, send HTTP request with bytes as content
        return true;
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

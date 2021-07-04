package com.matthewjohnson42.memex.dataservice.logic.thread;

import com.matthewjohnson42.memex.dataservice.data.enumeration.ThreadStatus;
import com.matthewjohnson42.memex.dataservice.data.mongo.service.ThreadMongoService;

public abstract class MemexDataServiceRunnable implements Runnable {

    protected final ThreadMongoService threadMongoService;

    protected int batchesProcessed;
    protected final int batchSize;

    public MemexDataServiceRunnable(ThreadMongoService threadMongoService, int batchSize) {
        this.threadMongoService = threadMongoService;
        this.batchSize = batchSize;
    }

    public void run() {
        setupRun();
        boolean complete = false;
        while (!complete) {
            complete = executeBatch();
            updateRun();
        }
        cleanupRun();
    }

    protected void setupRun() {
        threadMongoService.createThreadEntity(hashCode(), batchesProcessed, batchSize, getTotalCount(), getClass().getSimpleName());
    }

    protected abstract boolean executeBatch();

    protected abstract void updateRun();

    protected void cleanupRun() {
        threadMongoService.updateThreadEntity(hashCode(), batchesProcessed, ThreadStatus.COMPLETE);
    }

    public abstract int getTotalCount();

}

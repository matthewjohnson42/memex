package com.matthewjohnson42.memex.dataservice.data.mongo.entity;

import com.matthewjohnson42.memex.data.entity.Entity;
import com.matthewjohnson42.memex.dataservice.data.enumeration.ThreadStatus;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("dataServiceThread")
public class ThreadMongo extends Entity<Integer> {

    @Id
    private Integer id;
    private int batchesProcessed;
    private int batchSize;
    private ThreadStatus status;
    private int totalCount;
    private String type;

    public ThreadMongo() { }

    public Integer getId() {
        return id;
    }

    public ThreadMongo setId(Integer id) {
        this.id = id;
        return this;
    }

    public int getBatchesProcessed() {
        return batchesProcessed;
    }

    public ThreadMongo setBatchesProcessed(int batchesProcessed) {
        this.batchesProcessed = batchesProcessed;
        return this;
    }

    public int getBatchSize() {
        return batchSize;
    }

    public ThreadMongo setBatchSize(int batchSize) {
        this.batchSize = batchSize;
        return this;
    }

    public ThreadStatus getStatus() {
        return status;
    }

    public ThreadMongo setStatus(ThreadStatus status) {
        this.status = status;
        return this;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public ThreadMongo setTotalCount(int totalCount) {
        this.totalCount = totalCount;
        return this;
    }

    public String getType() {
        return type;
    }

    public ThreadMongo setType(String type) {
        this.type = type;
        return this;
    }

}

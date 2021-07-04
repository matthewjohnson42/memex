package com.matthewjohnson42.memex.dataservice.data.dto;

import com.matthewjohnson42.memex.data.dto.DtoForEntity;
import com.matthewjohnson42.memex.dataservice.data.enumeration.ThreadStatus;

public class ThreadDto extends DtoForEntity<Integer> {

    private Integer id;
    private int batchesProcessed;
    private int batchSize;
    private ThreadStatus status;
    private int totalCount;
    private String type;

    @Override
    public Integer getId() {
        return id;
    }

    @Override
    public ThreadDto setId(Integer id) {
        this.id = id;
        return this;
    }

    public int getBatchesProcessed() {
        return batchesProcessed;
    }

    public ThreadDto setBatchesProcessed(int batchesProcessed) {
        this.batchesProcessed = batchesProcessed;
        return this;
    }

    public int getBatchSize() {
        return batchSize;
    }

    public ThreadDto setBatchSize(int batchSize) {
        this.batchSize = batchSize;
        return this;
    }

    public ThreadStatus getStatus() {
        return status;
    }

    public ThreadDto setStatus(ThreadStatus status) {
        this.status = status;
        return this;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public ThreadDto setTotalCount(int totalCount) {
        this.totalCount = totalCount;
        return this;
    }

    public String getType() {
        return type;
    }

    public ThreadDto setType(String type) {
        this.type = type;
        return this;
    }

}

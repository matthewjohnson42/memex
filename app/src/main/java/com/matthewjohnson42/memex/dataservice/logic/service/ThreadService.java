package com.matthewjohnson42.memex.dataservice.logic.service;

import com.matthewjohnson42.memex.dataservice.data.RunnableStatusList;
import com.matthewjohnson42.memex.dataservice.logic.thread.ThreadPool;
import org.springframework.stereotype.Service;

@Service
public class ThreadService {

    private final ThreadPool threadPool;

    public ThreadService(ThreadPool threadPool) {
        this.threadPool = threadPool;
    }

    public RunnableStatusList getRunnableStatusList() {
        return new RunnableStatusList().setStatuses(threadPool.getRunnableStatuses());
    }
}

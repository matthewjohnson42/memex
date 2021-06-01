package com.matthewjohnson42.memex.dataservice.logic.thread;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.SynchronousQueue;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Component
public class ThreadPool {

    private final Logger logger = LoggerFactory.getLogger(ThreadPool.class);

    private final ThreadPoolExecutor threadPoolExecutor;

    public ThreadPool() {
        ThreadGroup tg = Thread.currentThread().getThreadGroup();
        while (tg.getParent() != null) {
            tg = tg.getParent();
        }
        threadPoolExecutor = new ThreadPoolExecutor(
                5, 5, 60 * 60 * 1000, TimeUnit.MILLISECONDS,
                new SynchronousQueue<>(), new ThreadFactoryImpl(tg));
    }

    public void execute(MemexDataServiceRunnable runnable) {
        threadPoolExecutor.execute(runnable);
    }

    public List<String> getRunnableStatuses() {
        List<String> runnableStatuses = new ArrayList<>();
        return threadPoolExecutor.getQueue().stream().map(
                runnable -> ((MemexDataServiceRunnable) runnable).getStatusString()
        ).collect(Collectors.toList());
    }

    private final class ThreadFactoryImpl implements ThreadFactory {
        private final ThreadGroup threadGroup;

        ThreadFactoryImpl(ThreadGroup threadGroup) {
            this.threadGroup = threadGroup;
        }

        public Thread newThread(Runnable runnable) {
            return new Thread(threadGroup, runnable);
        }
    }

}

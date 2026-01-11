package com.matthewjohnson42.memex.dataservice.logic.thread;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.concurrent.SynchronousQueue;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

@Component
public class ThreadPool {

    private final Logger logger = LoggerFactory.getLogger(ThreadPool.class);

    private final ThreadPoolExecutor threadPoolExecutor;

    public ThreadPool() {
        ThreadGroup rootThreadGroup = Thread.currentThread().getThreadGroup();
        while (rootThreadGroup.getParent() != null) {
            rootThreadGroup = rootThreadGroup.getParent();
        }
        ThreadGroup threadGroup = new ThreadGroup(rootThreadGroup, "memexDataServiceThreadGroup");
        threadPoolExecutor = new ThreadPoolExecutor(
                5, 5, 60 * 60 * 1000, TimeUnit.MILLISECONDS,
                new SynchronousQueue<>(), new ThreadFactoryImpl(threadGroup));
    }

    public void execute(MemexDataServiceRunnable runnable) {
        logger.info("Executing runnable with id: {}", runnable.hashCode());
        threadPoolExecutor.execute(runnable);
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

package com.matthewjohnson42.memex.dataservice.logic.thread;

public abstract class MemexDataServiceRunnable implements Runnable {
    public abstract void run();
    public abstract String getStatusString();
}

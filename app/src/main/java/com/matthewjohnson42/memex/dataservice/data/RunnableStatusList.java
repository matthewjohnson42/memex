package com.matthewjohnson42.memex.dataservice.data;

import java.util.List;

public class RunnableStatusList {

    List<String> statuses;

    public RunnableStatusList() { }

    public RunnableStatusList setStatuses(List<String> statuses) {
        this.statuses = statuses;
        return this;
    }

    public List<String> getStatuses() {
        return statuses;
    }

}

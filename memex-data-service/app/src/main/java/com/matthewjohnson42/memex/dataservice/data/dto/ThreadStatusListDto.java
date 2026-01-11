package com.matthewjohnson42.memex.dataservice.data.dto;

import java.util.List;

public class ThreadStatusListDto {

    List<String> statuses;

    public ThreadStatusListDto() { }

    public ThreadStatusListDto setStatuses(List<String> statuses) {
        this.statuses = statuses;
        return this;
    }

    public List<String> getStatuses() {
        return statuses;
    }

}

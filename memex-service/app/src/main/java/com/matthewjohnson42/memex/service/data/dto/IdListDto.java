package com.matthewjohnson42.memex.service.data.dto;

import java.util.ArrayList;
import java.util.List;

/**
 * A list of Mongo/ES ids
 */
public class IdListDto {

    private List<String> ids;

    public IdListDto() {
        ids = new ArrayList<>();
    }

    public IdListDto(List<String> ids) {
        this.ids = ids;
    }

    public IdListDto setIds(List<String> ids) {
        this.ids = ids;
        return this;
    }

    public List<String> getIds() {
        return ids;
    }

    public IdListDto addId(String id) {
        ids.add(id);
        return this;
    }

}

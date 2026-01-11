package com.matthewjohnson42.memex.service.data.dto;

public class PageRequestDto {

    protected int pageSize;
    protected int pageNumber;
    protected String sort;

    PageRequestDto() { }

    public int getPageSize() {
        return pageSize;
    }

    public PageRequestDto setPageSize(int pageSize) {
        this.pageSize = pageSize;
        return this;
    }

    public int getPageNumber() {
        return pageNumber;
    }

    public PageRequestDto setPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
        return this;
    }

    public String getSort() {
        return sort;
    }

    public PageRequestDto setSort(String sort) {
        this.sort = sort;
        return this;
    }

}

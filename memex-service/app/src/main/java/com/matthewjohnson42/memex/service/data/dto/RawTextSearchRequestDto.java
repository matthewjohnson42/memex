package com.matthewjohnson42.memex.service.data.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

public class RawTextSearchRequestDto extends PageRequestDto {

    private String searchString;
    private LocalDateTime startCreateDate;
    private LocalDateTime endCreateDate;
    private LocalDateTime startUpdateDate;
    private LocalDateTime endUpdateDate;

    @JsonCreator
    RawTextSearchRequestDto(
            @JsonProperty(value = "searchString", required = false) String searchString,
            @JsonProperty(value = "pageSize", required = true) int pageSize,
            @JsonProperty(value = "pageNumber", required = true) int pageNumber,
            @JsonProperty(value = "sort", required = false) String sort,
            @JsonProperty(value = "startCreateDate", required = false) LocalDateTime startCreateDate,
            @JsonProperty(value = "endCreateDate", required = false) LocalDateTime endCreateDate,
            @JsonProperty(value = "startUpdateDate", required = false) LocalDateTime startUpdateDate,
            @JsonProperty(value = "endUpdateDate", required = false) LocalDateTime endUpdateDate) {
        this.searchString = searchString;
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
        this.sort = sort;
        this.startCreateDate = startCreateDate;
        this.endCreateDate = endCreateDate;
        this.startUpdateDate = startUpdateDate;
        this.endUpdateDate = endUpdateDate;
    }

    public String getSearchString() {
        return searchString;
    }

    public RawTextSearchRequestDto setSearchString(String searchString) {
        this.searchString = searchString;
        return this;
    }

    public RawTextSearchRequestDto setPageSize(int pageSize) {
        this.pageSize = pageSize;
        return this;
    }

    public RawTextSearchRequestDto setPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
        return this;
    }

    public RawTextSearchRequestDto setSort(String sort) {
        this.sort = sort;
        return this;
    }

    public LocalDateTime getStartCreateDate() {
        return startCreateDate;
    }

    public RawTextSearchRequestDto setStartCreateDate(LocalDateTime startCreateDate) {
        this.startCreateDate = startCreateDate;
        return this;
    }

    public LocalDateTime getEndCreateDate() {
        return endCreateDate;
    }

    public RawTextSearchRequestDto setEndCreateDate(LocalDateTime endCreateDate) {
        this.endCreateDate = endCreateDate;
        return this;
    }

    public LocalDateTime getStartUpdateDate() {
        return startUpdateDate;
    }

    public RawTextSearchRequestDto setStartUpdateDate(LocalDateTime startUpdateDate) {
        this.startUpdateDate = startUpdateDate;
        return this;
    }

    public LocalDateTime getEndUpdateDate() {
        return endUpdateDate;
    }

    public RawTextSearchRequestDto setEndUpdateDate(LocalDateTime endUpdateDate) {
        this.endUpdateDate = endUpdateDate;
        return this;
    }

}

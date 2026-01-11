package com.matthewjohnson42.memex.service.data.dto;

import com.matthewjohnson42.memex.data.dto.RawTextDto;

import java.util.ArrayList;
import java.util.List;

public class RawTextSearchResponseDto extends RawTextDto {

    private List<String> highlights;

    public RawTextSearchResponseDto() {
        highlights = new ArrayList<>();
    }

    public RawTextSearchResponseDto(RawTextSearchResponseDto rawTextSearchResponseDto) {
        super(rawTextSearchResponseDto);
        this.highlights = rawTextSearchResponseDto.getHighlights();
    }

    public List<String> getHighlights() {
        return highlights;
    }
    public RawTextSearchResponseDto setHighlights(List<String> highlights) {
        this.highlights = highlights;
        return this;
    }

}

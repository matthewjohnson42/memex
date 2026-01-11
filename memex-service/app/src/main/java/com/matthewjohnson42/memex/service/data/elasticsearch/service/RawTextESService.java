package com.matthewjohnson42.memex.service.data.elasticsearch.service;

import com.matthewjohnson42.memex.data.converter.RawTextESConverter;
import com.matthewjohnson42.memex.data.dto.RawTextDto;
import com.matthewjohnson42.memex.data.entity.elasticsearch.RawTextES;
import com.matthewjohnson42.memex.data.entity.elasticsearch.RawTextESComposite;
import com.matthewjohnson42.memex.data.repository.elasticsearch.RawTextESRestTemplate;
import com.matthewjohnson42.memex.data.service.DataService;
import com.matthewjohnson42.memex.service.data.converter.RawTextESCompositeConverter;
import com.matthewjohnson42.memex.service.data.dto.RawTextSearchRequestDto;
import com.matthewjohnson42.memex.service.data.dto.RawTextSearchResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Data service implementing persistence logic for the raw text Elastic Search entity
 */
@Service
public class RawTextESService extends DataService<String, RawTextDto, RawTextES> {

    private RawTextESCompositeConverter rawTextESCompositeConverter;
    private RawTextESRestTemplate rawTextESRestTemplate;

    public RawTextESService(RawTextESConverter rawTextESConverter,
                            RawTextESCompositeConverter rawTextESCompositeConverter,
                            RawTextESRestTemplate rawTextESRestTemplate) {
        super(rawTextESConverter, rawTextESRestTemplate);
        this.rawTextESCompositeConverter = rawTextESCompositeConverter;
        this.rawTextESRestTemplate = rawTextESRestTemplate;
    }

    public Page<RawTextSearchResponseDto> search(RawTextSearchRequestDto rawTextSearchRequestDto) {
        String sortOrder = rawTextSearchRequestDto.getSort();
        Page<RawTextESComposite> rawTextESPage = rawTextESRestTemplate.getPageFromSearchString(
                rawTextSearchRequestDto.getSearchString(),
                rawTextSearchRequestDto.getStartCreateDate(),
                rawTextSearchRequestDto.getEndCreateDate(),
                rawTextSearchRequestDto.getStartUpdateDate(),
                rawTextSearchRequestDto.getEndUpdateDate(),
                PageRequest.of(rawTextSearchRequestDto.getPageNumber(),
                        rawTextSearchRequestDto.getPageSize(),
                        Sort.by(Sort.Direction.fromString(
                                !StringUtils.isEmpty(sortOrder) ? sortOrder : "DESC"),
                                "createDateTime")));
        List<RawTextSearchResponseDto> rawTextDtos = rawTextESPage.get().map(
                entity -> rawTextESCompositeConverter.convertEntity(entity)).collect(Collectors.toList()
        );
        return new PageImpl<>(rawTextDtos, rawTextESPage.getPageable(), rawTextESPage.getTotalElements());
    }

}

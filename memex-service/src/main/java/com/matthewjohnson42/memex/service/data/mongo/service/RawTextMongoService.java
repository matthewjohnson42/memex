package com.matthewjohnson42.memex.service.data.mongo.service;

import com.matthewjohnson42.memex.data.converter.RawTextMongoConverter;
import com.matthewjohnson42.memex.data.dto.RawTextDto;
import com.matthewjohnson42.memex.data.entity.mongo.RawTextMongo;
import com.matthewjohnson42.memex.data.service.DataService;
import com.matthewjohnson42.memex.service.data.dto.PageRequestDto;
import com.matthewjohnson42.memex.service.data.dto.RawTextSearchRequestDto;
import com.matthewjohnson42.memex.service.data.mongo.repository.RawTextMongoRepoInstance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * Data service for persistence logic on the RawText entity type
 */
@Service
public class RawTextMongoService extends DataService<String, RawTextDto, RawTextMongo> {

    private RawTextMongoRepoInstance rawTextMongoRepo;

    public RawTextMongoService(RawTextMongoConverter rawTextMongoConverter, RawTextMongoRepoInstance rawTextMongoRepo) {
        super(rawTextMongoConverter, rawTextMongoRepo);
        this.rawTextMongoRepo = rawTextMongoRepo;
    }

    public Page<RawTextDto> getPage(RawTextSearchRequestDto rawTextSearchRequestDto) {
        Pageable pageable = getPageable(rawTextSearchRequestDto);
        Page<RawTextMongo> rawTextMongoPage = rawTextMongoRepo.getByCreateDateTimeRange(
                rawTextSearchRequestDto.getStartCreateDate(),
                rawTextSearchRequestDto.getEndCreateDate(),
                pageable);
        return mongoPageToDtoPage(rawTextMongoPage);
    }

    public Page<RawTextDto> getPage(PageRequestDto pageRequestDto) {
        Pageable pageable = getPageable(pageRequestDto);
        Page<RawTextMongo> rawTextMongoPage = rawTextMongoRepo.findAll(pageable);
        return mongoPageToDtoPage(rawTextMongoPage);
    }

    private Pageable getPageable(PageRequestDto pageRequestDto) {
        String sortOrder = pageRequestDto.getSort();
        return PageRequest.of(pageRequestDto.getPageNumber(),
                pageRequestDto.getPageSize(),
                Sort.by(Sort.Direction.fromString(
                        !StringUtils.isEmpty(sortOrder) ? sortOrder : "DESC"),
                        "createDateTime"));
    }

    private Page<RawTextDto> mongoPageToDtoPage(Page<RawTextMongo> rawTextMongoPage) {
        List<RawTextDto> rawTextDtos = new ArrayList<>();
        rawTextMongoPage.getContent().forEach(entity -> rawTextDtos.add(converter.convertEntity(entity)));
        return new PageImpl<>(rawTextDtos, rawTextMongoPage.getPageable(), rawTextMongoPage.getTotalElements());
    }

}

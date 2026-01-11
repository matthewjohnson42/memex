package com.matthewjohnson42.memex.service.logic.service;

import com.matthewjohnson42.memex.data.config.MongoConfiguration;
import com.matthewjohnson42.memex.data.dto.RawTextDto;
import com.matthewjohnson42.memex.service.data.converter.RawTextDtoSearchResponseDtoConverter;
import com.matthewjohnson42.memex.service.data.dto.IdListDto;
import com.matthewjohnson42.memex.service.data.dto.PageRequestDto;
import com.matthewjohnson42.memex.service.data.dto.RawTextSearchRequestDto;
import com.matthewjohnson42.memex.service.data.dto.RawTextSearchResponseDto;
import com.matthewjohnson42.memex.service.data.elasticsearch.service.RawTextESService;
import com.matthewjohnson42.memex.service.data.mongo.service.RawTextMongoService;
import com.matthewjohnson42.memex.service.logic.util.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Service implementing raw text functions that operate across repository types.
 * Intended interface for DataServices.
 */
@Service
public class RawTextService {

    private RawTextESService rawTextESService;
    private RawTextMongoService rawTextMongoService;
    private RawTextDtoSearchResponseDtoConverter rawTextDtoSearchResponseDtoConverter;

    public RawTextService(RawTextESService rawTextESService,
                          RawTextMongoService rawTextMongoService,
                          RawTextDtoSearchResponseDtoConverter rawTextDtoSearchResponseDtoConverter) {
        this.rawTextESService = rawTextESService;
        this.rawTextMongoService = rawTextMongoService;
        this.rawTextDtoSearchResponseDtoConverter = rawTextDtoSearchResponseDtoConverter;
    }

    public RawTextDto create(RawTextDto rawTextDto) {
        LocalDateTime createDateTime = LocalDateTime.now();
        boolean validId = false;
        while (!validId) {
            String prospectiveId = StringUtils.randomId();
            if (!rawTextMongoService.exists(prospectiveId)) {
                rawTextDto.setId(prospectiveId);
                validId = true;
            }
        }
        rawTextDto = rawTextMongoService.create(rawTextDto, createDateTime);
        rawTextESService.create(rawTextDto, createDateTime);
        return rawTextDto;
    }

    public RawTextDto getById(String id) {
        return rawTextMongoService.getById(id);
    }

    public RawTextDto update(String id, RawTextDto rawTextDto) {
        LocalDateTime updateDateTime = LocalDateTime.now();
        rawTextDto.setId(id);
        rawTextDto = rawTextMongoService.update(rawTextDto, updateDateTime);
        rawTextESService.update(rawTextDto, updateDateTime);
        return rawTextDto;
    }

    public RawTextDto deleteById(String id) {
        RawTextDto rawTextDto = rawTextMongoService.deleteById(id);
        rawTextESService.deleteById(id);
        return rawTextDto;
    }

    public Page<RawTextDto> getPage(PageRequestDto pageRequestDto) {
        return rawTextMongoService.getPage(pageRequestDto);
    }

    public void deleteMany(IdListDto idListDto) {
        idListDto.getIds().stream().forEach(
                id -> {
                    try {
                        rawTextMongoService.deleteById(id);
                        rawTextESService.deleteById(id);
                    } catch (ResponseStatusException e) { /* no op */ }
                });
    }

    public Page<RawTextSearchResponseDto> search(RawTextSearchRequestDto rawTextSearchRequestDto) {
        if (rawTextSearchRequestDto.getStartCreateDate() == null) {
            rawTextSearchRequestDto.setStartCreateDate(MongoConfiguration.MIN_TIME);
        }
        if (rawTextSearchRequestDto.getEndCreateDate() == null) {
            rawTextSearchRequestDto.setEndCreateDate(MongoConfiguration.MAX_TIME);
        }
        if (rawTextSearchRequestDto.getStartUpdateDate() == null) {
            rawTextSearchRequestDto.setStartUpdateDate(MongoConfiguration.MIN_TIME);
        }
        if (rawTextSearchRequestDto.getEndUpdateDate() == null) {
            rawTextSearchRequestDto.setEndUpdateDate(MongoConfiguration.MAX_TIME);
        }
        if (org.springframework.util.StringUtils.isEmpty(rawTextSearchRequestDto.getSearchString())) {
            Page<RawTextDto> dtoPage = rawTextMongoService.getPage(rawTextSearchRequestDto);
            List<RawTextSearchResponseDto> responseDtos = new ArrayList<>();
            dtoPage.getContent().forEach(rawTextDto -> {
                responseDtos.add(rawTextDtoSearchResponseDtoConverter.convertDtoType1(rawTextDto));
            });
            return new PageImpl<>(responseDtos, dtoPage.getPageable(), dtoPage.getTotalElements());
        } else {
            return rawTextESService.search(rawTextSearchRequestDto);
        }
    }

}

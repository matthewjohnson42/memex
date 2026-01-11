package com.matthewjohnson42.memex.service.web.controller;

import com.matthewjohnson42.memex.data.dto.RawTextDto;
import com.matthewjohnson42.memex.service.logic.service.DataTransferService;
import com.matthewjohnson42.memex.service.logic.service.RawTextService;
import com.matthewjohnson42.memex.service.data.dto.IdListDto;
import com.matthewjohnson42.memex.service.data.dto.PageRequestDto;
import com.matthewjohnson42.memex.service.data.dto.RawTextSearchRequestDto;
import com.matthewjohnson42.memex.service.data.dto.RawTextSearchResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Web server http request controller for the RawText entity type
 */
@RestController
@RequestMapping("/api/v0/rawText")
public class RawTextController {

    private DataTransferService dataTransferService;
    private RawTextService rawTextService;

    public RawTextController(DataTransferService dataTransferService,
                             RawTextService rawTextService) {
        this.dataTransferService = dataTransferService;
        this.rawTextService = rawTextService;
    }

    @RequestMapping(method=RequestMethod.POST, value="")
    public RawTextDto create(@Validated @RequestBody RawTextDto dto) {
        return rawTextService.create(dto);
    }

    @RequestMapping(method=RequestMethod.GET, value="/{id}")
    public RawTextDto get(@PathVariable("id") String id) {
        return rawTextService.getById(id);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/{id}")
    public RawTextDto update(@PathVariable("id") String id, @Validated @RequestBody RawTextDto dto) {
        return rawTextService.update(id, dto);
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/{id}")
    public void delete(@PathVariable("id") String id) {
        rawTextService.deleteById(id);
    }

    @RequestMapping(method=RequestMethod.GET, value="")
    public Page<RawTextDto> getPage(PageRequestDto pageRequestDto) {
        return rawTextService.getPage(pageRequestDto);
    }

    @RequestMapping(method=RequestMethod.DELETE, value="")
    public void deleteMany(@Validated @RequestBody IdListDto idListDto) {
        rawTextService.deleteMany(idListDto);
    }

    @RequestMapping(method=RequestMethod.POST, value="/search")
    public Page<RawTextSearchResponseDto> search(@RequestBody RawTextSearchRequestDto searchDto) {
        return rawTextService.search(searchDto);
    }

    @RequestMapping(method=RequestMethod.POST, value="/transferFromMongoToES")
    public void transferFromMongoToES() {
        dataTransferService.transferRawTextToES();
    }

}

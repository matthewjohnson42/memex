package com.matthewjohnson42.memex.service.data.converter;

import com.matthewjohnson42.memex.data.converter.DtoConverter;
import com.matthewjohnson42.memex.data.dto.RawTextDto;
import com.matthewjohnson42.memex.service.data.dto.RawTextSearchResponseDto;
import org.springframework.stereotype.Component;

@Component
public class RawTextDtoSearchResponseDtoConverter implements DtoConverter<RawTextDto, RawTextSearchResponseDto> {
    public RawTextSearchResponseDto convertDtoType1(RawTextDto rawTextDto) {
        RawTextSearchResponseDto rawTextSearchResponseDto = new RawTextSearchResponseDto();
        rawTextSearchResponseDto.setId(rawTextDto.getId());
        rawTextSearchResponseDto.setTextContent(rawTextDto.getTextContent());
        rawTextSearchResponseDto.setCreateDateTime(rawTextDto.getCreateDateTime());
        rawTextSearchResponseDto.setUpdateDateTime(rawTextDto.getUpdateDateTime());
        return rawTextSearchResponseDto;
    }

    public RawTextDto convertDtoType2(RawTextSearchResponseDto rawTextSearchResponseDto) {
        RawTextDto rawTextDto = new RawTextDto();
        rawTextDto.setId(rawTextSearchResponseDto.getId());
        rawTextDto.setTextContent(rawTextSearchResponseDto.getTextContent());
        rawTextDto.setCreateDateTime(rawTextSearchResponseDto.getCreateDateTime());
        rawTextDto.setUpdateDateTime(rawTextSearchResponseDto.getUpdateDateTime());
        return rawTextDto;
    }
}

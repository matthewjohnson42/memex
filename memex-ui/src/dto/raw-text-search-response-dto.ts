import {RawTextDto} from './raw-text-dto';

export class RawTextSearchResponseDto extends RawTextDto {
    highlights: string[];
    constructor(id: string, textContent: string, highlights: string[], createDateTime: string, updateDateTime: string) {
        super(id, textContent, createDateTime, updateDateTime);
        this.highlights = highlights;
    }
}

import {Injectable} from '@angular/core';
import {RawText} from '../../data/raw-text';
import {Pageable} from '../../data/pageable';
import {RawTextSearchRequest} from '../../data/raw-text-search-request';

@Injectable({
    providedIn: 'root'
})
export class PersistenceService {

    rawTextRequest: RawText;
    rawTextResponse: RawText;
    rawTextPageResponse: Pageable<RawText>;
    rawTextSearchRequest: RawTextSearchRequest;
    rawTextSearchResponse: Pageable<RawText>;

    constructor() { }

    setRawTextRequest(rawText: RawText): void {
        this.rawTextRequest = rawText;
    }

    getRawTextRequest(): RawText {
        return this.rawTextRequest;
    }

    setRawTextResponse(rawText: RawText): void {
        this.rawTextResponse = rawText;
    }

    getRawTextResponse(): RawText {
        return this.rawTextResponse;
    }

    setRawTextPageResponse(rawTextPage: Pageable<RawText>): void {
        this.rawTextPageResponse = rawTextPage;
    }

    getRawTextPageResponse(): Pageable<RawText> {
        return this.rawTextPageResponse;
    }

    setRawTextSearchRequest(rawTextSearchRequest: RawTextSearchRequest) {
        this.rawTextSearchRequest = rawTextSearchRequest;
    }

    getRawTextSearchRequest(): RawTextSearchRequest {
        return this.rawTextSearchRequest;
    }

    setRawTextSearchResponse(rawTextSearchResponse: Pageable<RawText>) {
        console.log(rawTextSearchResponse);
        this.rawTextSearchResponse = rawTextSearchResponse;
    }

    getRawTextSearchResponse(): Pageable<RawText> {
        return this.rawTextSearchResponse;
    }

}

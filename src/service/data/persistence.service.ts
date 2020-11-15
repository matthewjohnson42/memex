import {Injectable, OnDestroy} from '@angular/core';
import {RawText} from '../../data/raw-text';
import {Pageable} from '../../data/pageable';

/**
 * Class providing persistence of http request bodies and http response bodies
 * Used in place of passing data between Angular components
 */
@Injectable({
    providedIn: 'root'
})
export class PersistenceService implements OnDestroy {

    /* the names of items as persisted to local storage */
    static readonly rawTextRequestName: string = 'rawTextRequest';
    static readonly rawTextResponseName: string = 'rawTextResponse';
    static readonly rawTextPageResponseName: string = 'rawTextPageResponse';
    static readonly rawTextSearchResponseName: string = 'rawTextSearchResponse';

    /* items to persist */
    rawTextRequest: RawText;
    rawTextResponse: RawText;
    rawTextPageResponse: Pageable<RawText>;
    rawTextSearchResponse: Pageable<RawText>;

    constructor() {
        this.loadRawTextRequest();
        this.loadRawTextResponse();
        this.loadRawTextPageResponse();
        this.loadRawTextSearchResponse();
    }

    ngOnDestroy() {
        console.log('Persistence service destroyed');
        this.persistRawTextRequest();
        this.persistRawTextResponse();
        this.persistRawTextPageResponse();
        this.persistRawTextSearchResponse();
    }

    /* getters and setters for the persistent member variables */
    getRawTextRequest(): RawText {
        return this.rawTextRequest;
    }
    setRawTextRequest(rawText: RawText): void {
        this.rawTextRequest = rawText;
        this.persistRawTextRequest();
    }
    getRawTextResponse(): RawText {
        return this.rawTextResponse;
    }
    setRawTextResponse(rawText: RawText): void {
        this.rawTextResponse = rawText;
        this.persistRawTextResponse();
    }
    getRawTextPageResponse(): Pageable<RawText> {
        return this.rawTextPageResponse;
    }
    setRawTextPageResponse(rawTextPage: Pageable<RawText>): void {
        this.rawTextPageResponse = rawTextPage;
        this.persistRawTextPageResponse();
    }
    getRawTextSearchResponse(): Pageable<RawText> {
        return this.rawTextSearchResponse;
    }
    setRawTextSearchResponse(rawTextSearchResponse: Pageable<RawText>) {
        this.rawTextSearchResponse = rawTextSearchResponse;
        this.persistRawTextSearchResponse();
    }

    /* load and persist methods for the persistent member variables */
    loadRawTextRequest(): void {
        const json = JSON.parse(localStorage.getItem(PersistenceService.rawTextRequestName));
        if ( json ) {
            this.rawTextRequest = this.parseRawText(json);
        }
    }
    persistRawTextRequest(): void {
        if ( this.rawTextRequest ) {
            localStorage.setItem(PersistenceService.rawTextRequestName, JSON.stringify(this.rawTextRequest));
        }
    }
    loadRawTextResponse(): void {
        const json = JSON.parse(localStorage.getItem(PersistenceService.rawTextResponseName));
        if ( json ) {
            this.rawTextResponse = this.parseRawText(json);
        }
    }
    persistRawTextResponse(): void {
        if ( this.rawTextResponse ) {
            localStorage.setItem(PersistenceService.rawTextResponseName, JSON.stringify(this.rawTextResponse));
        }
    }
    loadRawTextPageResponse(): void {
        const json = JSON.parse(localStorage.getItem(PersistenceService.rawTextPageResponseName));
        if ( json ) {
            this.rawTextPageResponse = this.parseRawTextPage(json);
        }
    }
    persistRawTextPageResponse(): void {
        if ( this.rawTextPageResponse ) {
            localStorage.setItem(PersistenceService.rawTextPageResponseName, JSON.stringify(this.rawTextPageResponse));
        }
    }
    loadRawTextSearchResponse(): void {
        const json = JSON.parse(localStorage.getItem(PersistenceService.rawTextSearchResponseName));
        if ( json ) {
            this.rawTextSearchResponse = this.parseRawTextPage(json);
        }
    }
    persistRawTextSearchResponse(): void {
        if ( this.rawTextSearchResponse ) {
            localStorage.setItem(PersistenceService.rawTextSearchResponseName, JSON.stringify(this.rawTextSearchResponse));
        }
    }

    /* helper methods */
    private parseRawText(json: any): RawText {
        return new RawText(
            json.id,
            json.textContent,
            json.createDateTime,
            json.updateDateTime
        );
    }
    private parseRawTextPage(json: any): Pageable<RawText> {
        const rawTextArray: Array<RawText> = new Array<RawText>();
        for ( const rawText of json.content ) {
            rawTextArray.push(this.parseRawText(rawText));
        }
        return new Pageable<RawText>(rawTextArray, json.totalElement, json.number, json.size);
    }

}

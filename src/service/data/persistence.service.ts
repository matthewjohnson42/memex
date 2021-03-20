import {Injectable} from '@angular/core';
import {RawText} from '../../data/raw-text';
import {Pageable} from '../../data/pageable';
import {RawTextSearchRequest} from '../../data/raw-text-search-request';
import {AuthResponse} from '../../data/auth-response';
import {Observable, of} from 'rxjs';
import {AppConfig} from "../../data/app-config";

/**
 * Class providing persistence of http request bodies and http response bodies
 * Used in place of passing data between Angular components
 */
@Injectable({
    providedIn: 'root'
})
export class PersistenceService {

    /* the names of items as persisted to local storage */
    static readonly authTokenName: string = 'authToken';
    static readonly rawTextRequestName: string = 'rawTextRequest';
    static readonly rawTextResponseName: string = 'rawTextResponse';
    static readonly rawTextSearchSelectionName: string = 'rawTextSearchSelection';
    static readonly rawTextPageResponseName: string = 'rawTextPageResponse';
    static readonly rawTextSearchResponseName: string = 'rawTextSearchResponse';
    static readonly rawTextSearchRequestName: string = 'rawTextSearchRequest';
    static readonly memexAppConfigName: string = 'memexAppConfig';

    constructor() {
        this.loadRawTextRequest();
        this.loadRawTextResponse();
        this.loadRawTextSearchSelection();
        this.loadRawTextPageResponse();
        this.loadRawTextSearchResponse();
        this.loadRawTextSearchRequest();
    }

    /* load and persist methods for the persistent member variables */
    loadMemexAppConfig(): AppConfig {
        const json = JSON.parse(localStorage.getItem(PersistenceService.memexAppConfigName));
        if ( json ) {
            return this.parseConfig(json);
        }
    }
    /* no setter for config; persisted in main.ts at application start */

    loadAuthToken(): string {
        const token = localStorage.getItem(PersistenceService.authTokenName);
        if ( token ) {
            return token;
        }
    }
    persistAuthToken(authResponse: AuthResponse) {
        if ( authResponse ) {
            localStorage.setItem(PersistenceService.authTokenName, authResponse.token);
        }
    }

    loadRawTextRequest(): RawText {
        const json = JSON.parse(localStorage.getItem(PersistenceService.rawTextRequestName));
        if ( json ) {
            return this.parseRawText(json);
        } else {
            return null;
        }
    }
    // todo update to Observable, do the same with all in class (can be blank consumer for ApiService, or a proper join)
    persistRawTextRequest(rawTextRequest: RawText): void {
        if ( rawTextRequest ) {
            localStorage.setItem(PersistenceService.rawTextRequestName, JSON.stringify(rawTextRequest));
        }
    }

    loadRawTextResponse(): RawText {
        const json = JSON.parse(localStorage.getItem(PersistenceService.rawTextResponseName));
        if ( json ) {
            return this.parseRawText(json);
        } else {
            return null;
        }
    }
    persistRawTextResponse(rawTextResponse: RawText): void {
        if ( rawTextResponse ) {
            localStorage.setItem(PersistenceService.rawTextResponseName, JSON.stringify(rawTextResponse));
        }
    }

    loadRawTextSearchSelection(): RawText {
        const json = JSON.parse(localStorage.getItem(PersistenceService.rawTextSearchSelectionName));
        if ( json ) {
            return this.parseRawText(json);
        } else {
            return null;
        }
    }
    persistRawTextSearchSelection(rawTextSearchSelection: RawText): Observable<any> {
        if ( rawTextSearchSelection ) {
            return of(localStorage.setItem(PersistenceService.rawTextSearchSelectionName, JSON.stringify(rawTextSearchSelection)));
        } else {
            return of();
        }
    }

    loadRawTextPageResponse(): Pageable<RawText> {
        const json = JSON.parse(localStorage.getItem(PersistenceService.rawTextPageResponseName));
        if ( json ) {
            return this.parseRawTextPage(json);
        } else {
            return null;
        }
    }
    persistRawTextPageResponse(rawTextPageResponse: Pageable<RawText>): void {
        if ( rawTextPageResponse ) {
            localStorage.setItem(PersistenceService.rawTextPageResponseName, JSON.stringify(rawTextPageResponse));
        }
    }

    loadRawTextSearchResponse(): Pageable<RawText> {
        const json = JSON.parse(localStorage.getItem(PersistenceService.rawTextSearchResponseName));
        if ( json ) {
            return this.parseRawTextPage(json);
        } else {
            return null;
        }
    }
    persistRawTextSearchResponse(rawTextSearchResponse: Pageable<RawText>): void {
        if ( rawTextSearchResponse ) {
            localStorage.setItem(PersistenceService.rawTextSearchResponseName, JSON.stringify(rawTextSearchResponse));
        }
    }

    loadRawTextSearchRequest(): RawTextSearchRequest {
        const json = JSON.parse(localStorage.getItem(PersistenceService.rawTextSearchRequestName));
        if ( json ) {
            return this.parseRawTextSearchRequest(json);
        } else {
            return null;
        }
    }
    // todo update to observable return type, do the same for all other persist methods
    persistRawTextSearchRequest(rawTextSearchRequest: RawTextSearchRequest): void {
        if ( rawTextSearchRequest ) {
            localStorage.setItem(PersistenceService.rawTextSearchRequestName, JSON.stringify(rawTextSearchRequest));
        } else {
            return null;
        }
    }

    /* helper methods */
    private parseConfig(json: any): AppConfig {
        return new AppConfig(
            json.production,
            json.apiProtocol,
            json.apiHost
        );
    }
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
    private parseRawTextSearchRequest(json: any): RawTextSearchRequest {
        return new RawTextSearchRequest(
            json.searchString,
            json.pageSize,
            json.pageNumber,
            json.startCreateDate,
            json.endUpdateDate
        );
    }

}

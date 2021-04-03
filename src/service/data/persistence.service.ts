import {Injectable} from '@angular/core';
import {RawTextDto} from '../../dto/raw-text-dto';
import {PageableDto} from '../../dto/pageable-dto';
import {RawTextSearchRequestDto} from '../../dto/raw-text-search-request-dto';
import {AuthResponseDto} from '../../dto/auth-response-dto';
import {Observable, of} from 'rxjs';
import {AppConfigDto} from '../../dto/app-config-dto';
import {HttpResponseDto} from '../../dto/http-response-dto';
import {RawTextSearchResponseDto} from '../../dto/raw-text-search-response-dto';

/**
 * Class providing persistence of http request bodies, http response bodies, and http errors
 * Used in place of passing data between Angular components
 */
@Injectable({
    providedIn: 'root'
})
export class PersistenceService {

    /* the names of items as persisted to local storage */
    static readonly authTokenName: string = 'authToken';
    static readonly rawHttpResponseName: string = 'rawHttpResponse';
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
    loadMemexAppConfig(): AppConfigDto { /* no setter for config; persisted in main.ts at application start */
        const json = JSON.parse(localStorage.getItem(PersistenceService.memexAppConfigName));
        if ( json ) {
            return this.parseConfig(json);
        }
    }

    loadAuthToken(): string {
        const token = localStorage.getItem(PersistenceService.authTokenName);
        return token;
    }
    persistAuthToken(authResponse: AuthResponseDto): Observable<any> {
        if ( authResponse ) {
            return of(localStorage.setItem(PersistenceService.authTokenName, authResponse.token));
        } else {
            return of(localStorage.removeItem(PersistenceService.authTokenName));
        }
    }

    loadHttpResponse(): HttpResponseDto {
        const httpResponse = JSON.parse(localStorage.getItem(PersistenceService.rawHttpResponseName));
        return httpResponse ? httpResponse as HttpResponseDto : null;
    }
    persistHttpResponse(httpResponse: HttpResponseDto): Observable<any> {
        if (httpResponse) {
            return of(localStorage.setItem(PersistenceService.rawHttpResponseName, JSON.stringify(httpResponse)));
        } else {
            return of(localStorage.removeItem(PersistenceService.rawHttpResponseName));
        }
    }

    loadRawTextRequest(): RawTextDto {
        const json = JSON.parse(localStorage.getItem(PersistenceService.rawTextRequestName));
        if ( json ) {
            return this.parseRawText(json);
        } else {
            return null;
        }
    }
    persistRawTextRequest(rawTextRequest: RawTextDto): Observable<any> {
        if ( rawTextRequest ) {
            return of(localStorage.setItem(PersistenceService.rawTextRequestName, JSON.stringify(rawTextRequest)));
        } else {
            return of(localStorage.removeItem(PersistenceService.rawTextRequestName));
        }
    }

    loadRawTextResponse(): RawTextDto {
        const json = JSON.parse(localStorage.getItem(PersistenceService.rawTextResponseName));
        if ( json ) {
            return this.parseRawText(json);
        } else {
            return null;
        }
    }
    persistRawTextResponse(rawTextResponse: RawTextDto): Observable<any> {
        if ( rawTextResponse ) {
            return of(localStorage.setItem(PersistenceService.rawTextResponseName, JSON.stringify(rawTextResponse)));
        } else {
            return of(localStorage.removeItem(PersistenceService.rawTextResponseName));
        }
    }

    loadRawTextSearchSelection(): RawTextDto {
        const json = JSON.parse(localStorage.getItem(PersistenceService.rawTextSearchSelectionName));
        return json ? json as RawTextDto : undefined;
    }
    persistRawTextSearchSelection(rawTextSearchSelection: RawTextDto): Observable<any> {
        if ( rawTextSearchSelection ) {
            return of(localStorage.setItem(PersistenceService.rawTextSearchSelectionName, JSON.stringify(rawTextSearchSelection)));
        } else {
            return of(localStorage.removeItem(PersistenceService.rawTextSearchSelectionName));
        }
    }

    loadRawTextPageResponse(): PageableDto<RawTextDto> {
        const json = JSON.parse(localStorage.getItem(PersistenceService.rawTextPageResponseName));
        if ( json ) {
            return this.parseRawTextPage(json);
        } else {
            return null;
        }
    }
    persistRawTextPageResponse(rawTextPageResponse: PageableDto<RawTextDto>): Observable<any> {
        if ( rawTextPageResponse ) {
            return of(localStorage.setItem(PersistenceService.rawTextPageResponseName, JSON.stringify(rawTextPageResponse)));
        } else {
            return of(localStorage.removeItem(PersistenceService.rawTextPageResponseName));
        }
    }

    loadRawTextSearchResponse(): PageableDto<RawTextSearchResponseDto> {
        const json = JSON.parse(localStorage.getItem(PersistenceService.rawTextSearchResponseName));
        if ( json ) {
            return this.parseRawTextSearchResponsePage(json);
        } else {
            return null;
        }
    }
    persistRawTextSearchResponse(rawTextSearchResponse: PageableDto<RawTextSearchResponseDto>): Observable<any> {
        if ( rawTextSearchResponse ) {
            return of(localStorage.setItem(PersistenceService.rawTextSearchResponseName, JSON.stringify(rawTextSearchResponse)));
        } else {
            return of(localStorage.removeItem(PersistenceService.rawTextSearchResponseName));
        }
    }

    loadRawTextSearchRequest(): RawTextSearchRequestDto {
        const json = JSON.parse(localStorage.getItem(PersistenceService.rawTextSearchRequestName));
        if ( json ) {
            return this.parseRawTextSearchRequest(json);
        } else {
            return null;
        }
    }
    persistRawTextSearchRequest(rawTextSearchRequest: RawTextSearchRequestDto): Observable<any> {
        if ( rawTextSearchRequest ) {
            return of(localStorage.setItem(PersistenceService.rawTextSearchRequestName, JSON.stringify(rawTextSearchRequest)));
        } else {
            return of(localStorage.remove(PersistenceService.rawTextSearchRequestName));
        }
    }

    /* helper methods */
    private parseConfig(json: any): AppConfigDto {
        return {
            production:                 json.production ? json.production : undefined,
            apiProtocol:                json.apiProtocol ? json.apiProtocol : undefined,
            apiHost:                    json.apiHost ? json.apiHost : undefined,
            errorMessageDisplayTime:    json.errorMessageDisplayTime ? json.errorMessageDisplayTime : undefined
        } as AppConfigDto;
    }
    private parseRawText(json: any): RawTextDto {
        return {
            id: json.id ? json.id : undefined,
            textContent:    json.textContent ? json.textContent : undefined,
            createDateTime: json.createDateTime ? json.createDateTime : undefined,
            updateDateTime: json.updateDateTime ? json.updateDateTime : undefined
        } as RawTextDto;
    }
    private parseRawTextPage(json: any): PageableDto<RawTextDto> {
        const rawTextArray: Array<RawTextDto> = new Array<RawTextDto>();
        for ( const rawText of json.content ) {
            rawTextArray.push(this.parseRawText(rawText));
        }
        return new PageableDto<RawTextDto>(rawTextArray, json.totalElements, json.number, json.size);
    }
    private parseRawTextSearchRequest(json: any): RawTextSearchRequestDto {
        return {
            searchString:       json.searchString ? json.searchString : undefined,
            pageSize:           json.pageSize ? json.pageSize : undefined,
            pageNumber:         json.pageNumber ? json.pageNumber : undefined,
            startCreateDate:    json.startCreateDate ? json.startCreateDate : undefined,
            endUpdateDate:      json.endUpdateDate ? json.endUpdateDate : undefined
        } as RawTextSearchRequestDto;
    }
    private parseRawTextSearchResponsePage(json: any): PageableDto<RawTextSearchResponseDto> {
        const rawTextSearchResponseArray: Array<RawTextSearchResponseDto> = new Array<RawTextSearchResponseDto>();
        for ( const rawTextSearchResponse of json.content ) {
            const rawTextSearchResponseDto = this.parseRawText(rawTextSearchResponse) as RawTextSearchResponseDto;
            rawTextSearchResponseDto.highlights = rawTextSearchResponse.highlights;
            rawTextSearchResponseArray.push(rawTextSearchResponseDto);
        }
        return new PageableDto<RawTextSearchResponseDto>(rawTextSearchResponseArray, json.totalElements, json.number, json.size);
    }

}

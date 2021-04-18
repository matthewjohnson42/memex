import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiUrls} from '../../const/api-urls';
import {PageableDto} from '../../dto/pageable-dto';
import {RawTextDto} from '../../dto/raw-text-dto';
import {HttpCommonService} from './http-common.service';
import {Observable} from 'rxjs';
import {PersistenceService} from '../data/persistence.service';
import {RawTextSearchRequestDto} from '../../dto/raw-text-search-request-dto';
import {map} from 'rxjs/operators';
import {AuthResponseDto} from '../../dto/auth-response-dto';
import {AuthRequestDto} from '../../dto/auth-request-dto';
import {RawTextSearchResponseDto} from '../../dto/raw-text-search-response-dto';
import {CommonService} from "../common.service";

/**
 * Service for forming HTTP requests.
 * Requests are made to the memex-service web API.
 * Responses are persisted with PersistenceService.
 */
@Injectable({
    providedIn: 'root'
})
export class ApiService {

    commonService: CommonService;
    httpClient: HttpClient;
    httpCommonService: HttpCommonService;
    persistenceService: PersistenceService;

    apiUrl: string;

    constructor(commonService: CommonService,
                httpClient: HttpClient,
                httpCommonService: HttpCommonService,
                persistenceService: PersistenceService) {
        const config = persistenceService.loadMemexAppConfig();
        this.apiUrl = config.apiProtocol + config.apiHost;
        this.commonService = commonService;
        this.httpClient = httpClient;
        this.httpCommonService = httpCommonService;
        this.persistenceService = persistenceService;
    }

    authenticate(authRequest: AuthRequestDto): Observable<any> {
        return this.httpClient.post<AuthResponseDto>(
            `${this.apiUrl}${ApiUrls.authUrl}`,
            authRequest,
            {observe: 'response'}
        ).pipe(
            map(response => {
                this.persistenceService.persistAuthToken(response.body).subscribe();
                return response;
            })
        );
    }

    getRawText(id: string): Observable<any> {
        return this.httpClient.get<RawTextDto>(
            `${this.apiUrl}${ApiUrls.rawTextUrl}/${id}`,
            {observe: 'response'}
        ).pipe(
            map(response => {
                this.persistenceService.persistRawTextResponse(response.body).subscribe();
                return response;
            })
        );
    }

    postRawText(rawText: RawTextDto): Observable<any> {
        return this.httpClient.post<RawTextDto>(
            `${this.apiUrl}${ApiUrls.rawTextUrl}`,
            rawText,
            {observe: 'response'}
        ).pipe(
            map(response => {
                this.persistenceService.persistRawTextRequest(response.body).subscribe();
                return response;
            })
        );
    }

    putRawText(rawText: RawTextDto): Observable<any> {
        return this.httpClient.put<RawTextDto>(
            `${this.apiUrl}${ApiUrls.rawTextUrl}/${rawText.id}`,
            rawText,
            {observe: 'response'}
        ).pipe(
            map(response => {
                this.persistenceService.persistRawTextRequest(response.body).subscribe();
                return response;
            })
        );
    }

    getRawTextPage(pageSize: number, pageNumber: number): Observable<any> {
        return this.httpClient.get<PageableDto<RawTextDto>>(
            `${this.apiUrl}${ApiUrls.rawTextUrl}`,
            {
                params: this.httpCommonService.getPageParams(
                    pageSize,
                    pageNumber
                ), observe: 'response'
            }
        ).pipe(
            map(response => {
                this.persistenceService.persistRawTextPageResponse(response.body).subscribe();
                return response;
            })
        );
    }

    search(rawTextSearchRequest: RawTextSearchRequestDto): Observable<any> {
        return this.httpClient.post<PageableDto<RawTextSearchResponseDto>>(
            `${this.apiUrl}${ApiUrls.rawTextSearchUrl}`,
            rawTextSearchRequest,
            {observe: 'response'}
        ).pipe(
            map(response => {
                // todo find a way to move to the raw text service using observable pipe consolidation
                const searchResponse = response.body;
                for (let i = 0; i < searchResponse.content.length; i++) {
                    searchResponse.content[i].createDateTime = this.commonService.parseDateString(searchResponse.content[i].createDateTime);
                    searchResponse.content[i].updateDateTime = this.commonService.parseDateString(searchResponse.content[i].updateDateTime);
                }
                this.persistenceService.persistRawTextSearchResponse(searchResponse).subscribe();
                return response;
            })
        );
    }

}

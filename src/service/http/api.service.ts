import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiUrls} from '../../const/api-urls';
import {Pageable} from '../../data/pageable';
import {RawText} from '../../data/raw-text';
import {ConfigService} from '../config.service';
import {HttpCommonService} from './http-common.service';
import {Observable} from 'rxjs';
import {PersistenceService} from '../data/persistence.service';
import {RawTextSearchRequest} from '../../data/raw-text-search-request';
import {map} from 'rxjs/operators';
import {AuthResponse} from '../../data/auth-response';
import {AuthRequest} from '../../data/auth-request';

/**
 * Service for forming HTTP requests.
 * Requests are made to the personal-memex-service web API.
 * Responses are persisted in the requesting service.
 */
@Injectable({
    providedIn: 'root'
})
export class ApiService {

    apiUrl: string;
    httpClient: HttpClient;
    httpCommonService: HttpCommonService;
    persistenceService: PersistenceService;

    constructor(httpClient: HttpClient, httpCommonService: HttpCommonService, persistenceService: PersistenceService) {
        this.apiUrl = ConfigService.config.apiUrl;
        this.httpClient = httpClient;
        this.httpCommonService = httpCommonService;
        this.persistenceService = persistenceService;
    }

    authenticate(authRequest: AuthRequest): Observable<any> {
        return this.httpClient.post<AuthResponse>(
            `${this.apiUrl}${ApiUrls.authUrl}`,
            authRequest,
            {observe: 'body'}
        ).pipe(
            map(responseBody => {
                this.persistenceService.persistAuthToken(responseBody);
            })
        );
    }

    getRawText(id: string): Observable<any> {
        return this.httpClient.get<RawText>(
            `${this.apiUrl}${ApiUrls.rawTextUrl}/${id}`,
            {observe: 'body'}
        ).pipe(
            map(responseBody => {
                this.persistenceService.persistRawTextResponse(responseBody);
            })
        );
    }

    postRawText(rawText: RawText): Observable<any> {
        return this.httpClient.post<RawText>(
            `${this.apiUrl}${ApiUrls.rawTextUrl}`,
            rawText,
            {observe: 'body'}
        ).pipe(
            map(response => {
                this.persistenceService.persistRawTextRequest(response);
            })
        );
    }

    putRawText(rawText: RawText): Observable<any> {
        return this.httpClient.put<RawText>(
            `${this.apiUrl}${ApiUrls.rawTextUrl}/${rawText.id}`,
            rawText,
            {observe: 'body'}
        ).pipe(
            map(response => {
                this.persistenceService.persistRawTextRequest(response);
            })
        );
    }

    getRawTextPage(pageSize: number, pageNumber: number): Observable<any> {
        return this.httpCommonService.getPageParams(
            pageSize,
            pageNumber
        ).pipe(
            map(params => {
                this.httpClient.get<Pageable<RawText>>(
                    `${this.apiUrl}${ApiUrls.rawTextUrl}`,
                    {params: params, observe: 'body'}
                ).subscribe(
                    responseBody => {
                        this.persistenceService.persistRawTextPageResponse(responseBody);
                    }
                );
            })
        );
    }

    search(rawTextSearchRequest: RawTextSearchRequest): Observable<any> {
        return this.httpClient.post<Pageable<RawText>>(
            `${this.apiUrl}${ApiUrls.rawTextSearchUrl}`,
            rawTextSearchRequest,
            {observe: 'body'}
        ).pipe(
            map(response => {
                this.persistenceService.persistRawTextSearchResponse(response);
            })
        );
    }

}

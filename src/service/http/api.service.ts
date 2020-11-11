import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiUrls} from '../../const/api-urls';
import {Pageable} from '../../data/pageable';
import {RawText} from '../../data/raw-text';
import {ConfigService} from '../config.service';
import {HttpCommonService} from './http-common.service';
import {Observable, of} from 'rxjs';
import {PersistenceService} from '../data/persistence.service';

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

    getRawTextPage(pageSize: number, pageNumber: number): Observable<any> {
        return of(this.httpCommonService.getPageParams(pageSize, pageNumber).subscribe(params => {
            this.httpClient.get<Pageable<RawText>>(
                `${this.apiUrl}${ApiUrls.rawTextUrl}`,
                {
                    params: params,
                    observe: 'body'
                }
            ).subscribe(responseBody => {
                this.persistenceService.setRequestedRawTextPage(responseBody);
            });
        }));
    }

    getRawText(id: string): Observable<any> {
        return of(this.httpClient.get<RawText>(
            `${this.apiUrl}${ApiUrls.rawTextUrl}/${id}`,
            {
                observe: 'body'
            }
        ).subscribe(responseBody => {
            this.persistenceService.setRequestedRawText(responseBody);
        }));
    }

    postRawText(rawText: RawText): Observable<any> {
        return of(this.httpClient.post<RawText>(
            `${this.apiUrl}${ApiUrls.rawTextUrl}`,
            rawText,
            {
                observe: 'body'
            }
        ).subscribe(response => {
            this.persistenceService.setSubmittedRawText(response);
        }));
    }

    putRawText(rawText: RawText): Observable<any> {
        return of(this.httpClient.put<RawText>(
            `${this.apiUrl}${ApiUrls.rawTextUrl}/${rawText.id}`,
            rawText,
            {
                observe: 'body'
            }
        ).subscribe(response => {
            this.persistenceService.setSubmittedRawText(response);
        }));
    }

}

import {Injectable} from '@angular/core';
import {RawText} from '../../data/raw-text';
import {ApiService} from '../http/api.service';
import {HttpCommonService} from '../http/http-common.service';
import {Observable} from 'rxjs';
import {RawTextSearchRequest} from '../../data/raw-text-search-request';
import {PersistenceService} from './persistence.service';

/**
 * Service for specification of raw text transformations.
 * Values that would typically be returned by a function are persisted as internal objects.
 */
@Injectable({
    providedIn: 'root'
})
export class RawTextService {

    apiService: ApiService;
    httpCommonService: HttpCommonService;
    persistenceService: PersistenceService;

    constructor(apiService: ApiService, httpCommonService: HttpCommonService, persistenceService: PersistenceService) {
        this.apiService = apiService;
        this.httpCommonService = httpCommonService;
        this.persistenceService = persistenceService;
    }

    getPage(pageSize: number, pageNumber: number): Observable<any> {
        return this.apiService.getRawTextPage(pageSize, pageNumber);
    }

    post(entry: string): Observable<any> {
        const rawText: RawText = {
            textContent: entry
        };
        return this.apiService.postRawText(rawText);
    }

    put(id: string, entry: string): Observable<any> {
        const rawText: RawText = {
            id: id,
            textContent: entry
        };
        return this.apiService.putRawText(rawText);
    }

    search(searchString: string, startDate ?: Date, endDate ?: Date, pageSize ?: number, pageNumber ?: number): Observable<any> {
        const rawTextSearchRequest: RawTextSearchRequest = {
            searchString: searchString,
            startCreateDate: startDate instanceof Date ? startDate.toISOString() : null,
            endUpdateDate: endDate instanceof Date ? endDate.toISOString() : null,
            pageSize: pageSize ? pageSize : 10,
            pageNumber: pageNumber ? pageNumber : 0
        };
        this.persistenceService.persistRawTextSearchRequest(rawTextSearchRequest);
        return this.apiService.search(rawTextSearchRequest);
    }

    searchFromPrevious(pageNumber: number): Observable<any> {
        const rawTextSearchRequest: RawTextSearchRequest = this.persistenceService.loadRawTextSearchRequest();
        rawTextSearchRequest.pageNumber = pageNumber;
        this.persistenceService.persistRawTextSearchRequest(rawTextSearchRequest);
        return this.apiService.search(rawTextSearchRequest);
    }

}

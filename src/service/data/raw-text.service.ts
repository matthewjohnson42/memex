import {Injectable} from '@angular/core';
import {RawTextDto} from '../../dto/raw-text-dto';
import {ApiService} from '../http/api.service';
import {HttpCommonService} from '../http/http-common.service';
import {Observable} from 'rxjs';
import {RawTextSearchRequestDto} from '../../dto/raw-text-search-request-dto';
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
        const rawText: RawTextDto = {
            textContent: entry
        };
        return this.apiService.postRawText(rawText);
    }

    put(id: string, entry: string): Observable<any> {
        const rawText: RawTextDto = {
            id: id,
            textContent: entry
        };
        return this.apiService.putRawText(rawText);
    }

    search(searchString: string, startDate ?: Date, endDate ?: Date, pageSize ?: number, pageNumber ?: number): Observable<any> {
        const rawTextSearchRequest: RawTextSearchRequestDto = {
            searchString: searchString,
            startCreateDate: startDate instanceof Date ? startDate.toISOString() : null,
            endUpdateDate: endDate instanceof Date ? endDate.toISOString() : null,
            pageSize: pageSize ? pageSize : 10,
            pageNumber: pageNumber ? pageNumber : 0
        };
        this.persistenceService.persistRawTextSearchRequest(rawTextSearchRequest).subscribe();
        return this.apiService.search(rawTextSearchRequest);
    }

    searchFromPrevious(pageNumber: number): Observable<any> {
        const rawTextSearchRequest: RawTextSearchRequestDto = this.persistenceService.loadRawTextSearchRequest();
        rawTextSearchRequest.pageNumber = pageNumber;
        this.persistenceService.persistRawTextSearchRequest(rawTextSearchRequest).subscribe();
        return this.apiService.search(rawTextSearchRequest);
    }

}

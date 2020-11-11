import {Injectable} from '@angular/core';
import {RawText} from '../../data/raw-text';
import {ApiService} from '../http/api.service';
import {HttpCommonService} from '../http/http-common.service';
import {Observable} from 'rxjs';

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

    constructor(apiService: ApiService, httpCommonService: HttpCommonService) {
        this.apiService = apiService;
        this.httpCommonService = httpCommonService;
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
            id,
            textContent: entry
        };
        return this.apiService.putRawText(rawText);
    }

}

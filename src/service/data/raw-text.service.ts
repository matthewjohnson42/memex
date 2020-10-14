import {Injectable} from '@angular/core';
import {Pageable} from '../../data/pageable';
import {RawText} from '../../data/raw-text';
import {ApiService} from '../http/api.service';
import {HttpCommonService} from '../http/http-common.service';
import {Observable} from 'rxjs';

/**
 * Service for specification of
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

    getPage(pageSize: number, pageNumber: number): Observable<Pageable<RawText>> {
        const params = this.httpCommonService.getPageParams(pageSize, pageNumber);
        return this.apiService.getRawTextPage(params);
    }

    post(entry: string): Observable<RawText> {
        const rawText: RawText = {
            textContent: entry
        };
        return this.apiService.postRawText(rawText);
    }

    put(id: string, entry: string): Observable<RawText> {
        const rawText: RawText = {
            id,
            textContent: entry
        };
        return this.apiService.putRawText(rawText);
    }

}

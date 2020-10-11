import {Injectable} from '@angular/core';
import {Pageable} from '../data/pageable';
import {RawText} from '../data/raw-text';
import {ApiService} from './api.service';
import {HttpHelperService} from './http-helper.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RawTextService {

    apiService: ApiService;
    httpHelperService: HttpHelperService;

    constructor(apiService: ApiService, httpHelperService: HttpHelperService) {
        this.apiService = apiService;
        this.httpHelperService = httpHelperService;
    }

    getPage(pageSize: number, pageNumber: number): Observable<Pageable<RawText>> {
        const params = this.httpHelperService.getPageParams(pageSize, pageNumber);
        return this.apiService.getEntryPage(params);
    }
}

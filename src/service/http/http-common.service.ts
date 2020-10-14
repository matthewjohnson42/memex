import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';

/**
 * Service for creation of common HTTP objects
 */
@Injectable()
export class HttpCommonService {
    getPageParams(pageSize: number, pageNumber: number): HttpParams {
        return new HttpParams()
            .set('pageSize', pageSize.toString())
            .set('pageNumber', pageNumber.toString())
            .set('sort', 'desc');
    }
}

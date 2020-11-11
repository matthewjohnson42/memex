import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';

/**
 * Service for creation of common HTTP objects.
 */
@Injectable()
export class HttpCommonService {
    getPageParams(pageSize: number, pageNumber: number): Observable<HttpParams> {
        return of(new HttpParams()
            .set('pageSize', pageSize.toString())
            .set('pageNumber', pageNumber.toString())
            .set('sort', 'desc'));
    }
}

import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';

@Injectable()
export class HttpHelperService {
    getPageParams(pageSize: number, pageNumber: number): HttpParams {
        return new HttpParams()
            .set('pageSize', pageSize.toString())
            .set('pageNumber', pageNumber.toString())
            .set('sort', 'desc');
    }
}

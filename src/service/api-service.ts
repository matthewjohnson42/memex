import {Injectable} from '@angular/core';
import {PageRequest} from '../data/page-request';
import {HttpClient} from '@angular/common/http';
import {ApiUrls} from '../const/api-urls';
import {Pageable} from '../data/pageable';
import {RawText} from '../data/raw-text';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    httpClient: HttpClient;
    urls: ApiUrls;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    getEntryPage(request: PageRequest): Pageable<RawText> {
        if (!this.httpClient.get<Pageable<RawText>>(
            this.urls.rawTextUrl,
            {
                observe: 'body'
            }
        ).subscribe(next => {
            return next;
        })) {
            return new Pageable<RawText>();
        }
    }

}

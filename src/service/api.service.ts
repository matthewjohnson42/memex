import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiUrls} from '../const/api-urls';
import {Pageable} from '../data/pageable';
import {RawText} from '../data/raw-text';
import {ConfigService} from './config.service';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    apiUrl: string;
    httpClient: HttpClient;

    constructor(configService: ConfigService, httpClient: HttpClient) {
        this.apiUrl = configService.getConfig().apiUrl;
        this.httpClient = httpClient;
    }

    getEntryPage(params: HttpParams): Observable<Pageable<RawText>> {
        return this.httpClient.get<Pageable<RawText>>(
            this.apiUrl + ApiUrls.rawTextUrl,
            {
                params,
                observe: 'body'
            }
        );
    }

}

import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiUrls} from '../../const/api-urls';
import {Pageable} from '../../data/pageable';
import {RawText} from '../../data/raw-text';
import {ConfigService} from '../config.service';
import {Observable} from 'rxjs';

/**
 * Service for specification of HTTP request format.
 * Requests are made to the personal-memex-service web API.
 */
@Injectable({
    providedIn: 'root'
})
export class ApiService {

    apiUrl: string;
    httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.apiUrl = ConfigService.config.apiUrl;
        this.httpClient = httpClient;
    }

    getRawTextPage(params: HttpParams): Observable<Pageable<RawText>> {
        return this.httpClient.get<Pageable<RawText>>(
            `${this.apiUrl}${ApiUrls.rawTextUrl}`,
            {
                params,
                observe: 'body'
            }
        );
    }

    getRawText(id: string): Observable<RawText> {
        return this.httpClient.get<RawText>(
            `${this.apiUrl}${ApiUrls.rawTextUrl}/${id}`,
            {
                observe: 'body'
            }
        );
    }

    postRawText(rawText: RawText): Observable<RawText> {
        return this.httpClient.post<RawText>(
            `${this.apiUrl}${ApiUrls.rawTextUrl}`,
            rawText,
            {
                observe: 'body'
            }
        );
    }

    putRawText(rawText: RawText): Observable<RawText> {
        return this.httpClient.put<RawText>(
            `${this.apiUrl}${ApiUrls.rawTextUrl}/${rawText.id}`,
            rawText,
            {
                observe: 'body'
            }
        );
    }

}

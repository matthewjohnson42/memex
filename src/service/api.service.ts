import {Injectable} from '@angular/core';
import {PageRequest} from '../data/page-request';
import {HttpClient} from '@angular/common/http';
import {ApiUrls} from '../const/api-urls';
import {Pageable} from '../data/pageable';
import {RawText} from '../data/raw-text';
import {ConfigService} from './config.service';

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

    getEntryPage(request: PageRequest): Pageable<RawText> {
        if (!this.httpClient.get<Pageable<RawText>>(
            this.apiUrl + ApiUrls.rawTextUrl,
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

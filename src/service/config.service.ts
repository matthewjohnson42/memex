import {enableProdMode, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../config/app-config';

@Injectable()
export class ConfigService {
    static config: AppConfig;
    httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    load(): Promise<void> {
        return this.httpClient.get<AppConfig>('assets/config.json').toPromise().then( value => {
            ConfigService.config = value;
            if (ConfigService.config.production === true) {
                enableProdMode();
            }
        });
    }
}

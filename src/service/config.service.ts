import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../config/app-config';

@Injectable()
export class ConfigService {
    httpClient: HttpClient;
    config: AppConfig;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    load(): void {
        this.httpClient.get<AppConfig>('assets/config.json').subscribe(
            next => {
                this.config = next;
            }
        );
    }

    getConfig(): AppConfig {
        return this.config;
    }
}

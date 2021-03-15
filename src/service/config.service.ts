import {enableProdMode, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../config/app-config';

/**
 * ConfigService that loads JSON and creates a TypeScript object.
 *
 * Allows for use of config specifically as JSON, rather than the TypeScript used by Angular. This eases integration of
 * configurations with those of other systems. EG: JSON config for SpringBoot apps, Micronaut apps, Angular apps, and
 * React apps all referenced by a single CICD system like Jenkins or Ansible Tower.
 */
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

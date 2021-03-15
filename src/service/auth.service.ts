import {Injectable} from '@angular/core';
import {ApiService} from './http/api.service';
import {PersistenceService} from './data/persistence.service';
import {Observable} from 'rxjs';
import {AuthRequest} from '../data/auth-request';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    apiService: ApiService;
    persistenceService: PersistenceService;

    constructor(apiService: ApiService, persistenceService: PersistenceService) {
        this.apiService = apiService;
        this.persistenceService = persistenceService;
    }

    login(username: string, password: string): Observable<any> {
        const authRequest: AuthRequest = {
            username: username,
            password: password
        };
        return this.apiService.authenticate(authRequest);
    }

    getToken(): string {
        return this.persistenceService.loadAuthToken();
    }

}

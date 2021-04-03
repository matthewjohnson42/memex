import {Injectable} from '@angular/core';
import {ApiService} from './http/api.service';
import {PersistenceService} from './data/persistence.service';
import {Observable} from 'rxjs';
import {AuthRequestDto} from '../dto/auth-request-dto';
import {ActivatedRouteSnapshot, CanActivate, DefaultUrlSerializer, RouterStateSnapshot, UrlTree} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UiRoutes} from '../const/ui-routes';

/**
 * Service for accessing authentication functionality on the personal-memex-service,
 * and for referencing retrieved authentication information
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService implements CanActivate {

    apiService: ApiService;
    jwtHelperService = new JwtHelperService();
    persistenceService: PersistenceService;

    constructor(apiService: ApiService, persistenceService: PersistenceService) {
        this.apiService = apiService;
        this.persistenceService = persistenceService;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.jwtHelperService.isTokenExpired(this.persistenceService.loadAuthToken())) {
            return new DefaultUrlSerializer().parse(UiRoutes.login);
        } else {
            return true;
        }
    }

    login(username: string, password: string): Observable<any> {
        const authRequest = {
            username: username,
            password: password
        } as AuthRequestDto;
        return this.apiService.authenticate(authRequest);
    }

}

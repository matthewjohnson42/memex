import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {PersistenceService} from '../data/persistence.service';
import {UiRoutes} from '../../const/ui-routes';
import {HttpCommonService} from './http-common.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    httpCommonService: HttpCommonService;
    jwtHelperService = new JwtHelperService();
    persistenceService: PersistenceService;
    router: Router;

    constructor(httpCommonService: HttpCommonService, persistenceService: PersistenceService, router: Router) {
        this.httpCommonService = httpCommonService;
        this.persistenceService = persistenceService;
        this.router = router;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.persistenceService.loadAuthToken() &&
            this.jwtHelperService.isTokenExpired(this.persistenceService.loadAuthToken()) && !req.url.includes('auth')) {
            this.router.navigateByUrl(UiRoutes.login).then();
            return of();
        } else {
            let clonedReq;
            if (!req.url.includes('auth')) {
                clonedReq = req.clone({
                    setHeaders:
                        { Authorization: 'Bearer ' + this.persistenceService.loadAuthToken() }
                });
            } else {
                clonedReq = req.clone();
            }
            return next.handle(clonedReq);
        }
    }

}

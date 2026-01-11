import {Injectable} from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHeaderResponse,
    HttpParams,
    HttpResponse,
    HttpResponseBase
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {HttpResponseDto} from '../../dto/http-response-dto';
import {UiRoutes} from '../../const/ui-routes';
import {Router} from '@angular/router';
import {PersistenceService} from '../data/persistence.service';
import {MatSnackBar} from '@angular/material/snack-bar';

/**
 * Service for creation of common HTTP objects.
 */
@Injectable({
    providedIn: 'root'
})
export class HttpCommonService {

    matSnackBar: MatSnackBar;
    persistenceService: PersistenceService;
    router: Router;

    errorMessageDisplayTime: number;

    constructor(matSnackBar: MatSnackBar, persistenceService: PersistenceService, router: Router) {
        const config = persistenceService.loadMemexAppConfig();
        this.errorMessageDisplayTime = config.errorMessageDisplayTime;
        this.matSnackBar = matSnackBar;
        this.persistenceService = persistenceService;
        this.router = router;
    }

    getPageParams(pageSize: number, pageNumber: number): HttpParams {
        return new HttpParams()
            .set('pageSize', pageSize.toString())
            .set('pageNumber', pageNumber.toString())
            .set('sort', 'desc');
    }

    parseResponse(response: HttpResponseBase): HttpResponseDto {
        const headers = new Map<string, string>();
        for (const header of response.headers.keys()) {
            headers.set(header, response.headers.get(header));
        }
        if (response instanceof HttpResponse) {
            return {
                headers: headers,
                status: response.status,
                content: response.body
            } as HttpResponseDto;
        } else if (response instanceof HttpErrorResponse) {
            return {
                headers: headers,
                status: response.status,
                content: response.error
            } as HttpResponseDto;
        } else if (response instanceof HttpHeaderResponse) {
            /* do not parse header responses */
        } else {
            return new HttpResponseDto();
        }
    }

    handleError(httpEvent: HttpEvent<any>): Observable<HttpEvent<any>> {
        if (httpEvent instanceof HttpErrorResponse &&
            (httpEvent.status === 401 || httpEvent.status === 403)) {
            // todo move error messages to the component level
            this.matSnackBar.open('Authentication issue.', 'OK', {
                duration: this.errorMessageDisplayTime
            });
            this.persistenceService.persistAuthToken(undefined);
            this.router.navigateByUrl(UiRoutes.login).then();
        }
        return of(httpEvent);
    }
}

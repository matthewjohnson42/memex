import {Injectable} from '@angular/core';
import {
    HttpEvent,
    HttpHandler, HttpInterceptor,
    HttpRequest,
    HttpResponseBase
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpCommonService} from './http-common.service';
import {PersistenceService} from '../data/persistence.service';
import {catchError, map} from 'rxjs/operators';
import {HttpResponseDto} from '../../dto/http-response-dto';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

    httpCommonService: HttpCommonService;
    persistenceService: PersistenceService;

    constructor(httpCommonService: HttpCommonService, persistenceService: PersistenceService) {
        this.httpCommonService = httpCommonService;
        this.persistenceService = persistenceService;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.persistenceService.persistHttpResponse(undefined);
        return next.handle(req).pipe(
            map(value => {
                if (value instanceof HttpResponseBase) {
                    const httpResponseDto: HttpResponseDto = this.httpCommonService.parseResponse(value);
                    this.persistenceService.persistHttpResponse(httpResponseDto);
                }
                return value;
            }),
            catchError(error => {
                if (error instanceof HttpResponseBase) {
                    const httpResponseDto: HttpResponseDto = this.httpCommonService.parseResponse(error);
                    this.persistenceService.persistHttpResponse(httpResponseDto);
                }
                return this.httpCommonService.handleError(error);
            })
        );
    }

}

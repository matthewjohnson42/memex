import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from '../app/app.component';
import {MainHeaderComponent} from '../app/main-header/main-header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {EntryScreenComponent} from '../app/entry-screen/entry-screen.component';
import {SearchQueryScreenComponent} from '../app/search-screen/search-query-screen/search-query-screen.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SearchResultScreenComponent} from '../app/search-screen/search-result-screen/search-result-screen.component';
import {AuthService} from '../service/auth.service';
import {RawTextService} from '../service/data/raw-text.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpCommonService} from '../service/http/http-common.service';
import {LoginScreenComponent} from '../app/login-screen/login-screen.component';
import {PersistenceService} from '../service/data/persistence.service';
import {ApiService} from '../service/http/api.service';
import {JwtModule} from '@auth0/angular-jwt';
import {AuthInterceptor} from '../service/http/auth-interceptor';
import {Router} from '@angular/router';
import {ResponseInterceptor} from '../service/http/response-interceptor';
import {MatSnackBar} from '@angular/material/snack-bar';

/**
 * Default app module; specifies the components used by the app, along with imported modules.
 * Also specifies the services that are loaded at application start, which persist across the load
 * of any given component into the display.
 *
 * Entry point for other components is AppComponent.
 *
 * Services:
 *  ApiService - http requests
 *  AuthService - authentication with server via ApiService and PersistenceService
 *  ConfigService - Angular configurations (base apiUrl)
 *  HttpCommonService - common utils used by ApiService
 *  PersistenceService - storage of session information
 *  RawTextService - text document retrieval and storage via ApiService and PersistenceService
 */
@NgModule({
    declarations: [
        AppComponent,
        MainHeaderComponent,
        EntryScreenComponent,
        LoginScreenComponent,
        SearchQueryScreenComponent,
        SearchResultScreenComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        JwtModule,
        MaterialModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    exports: [],
    providers: [
        ApiService,
        AuthService,
        HttpCommonService,
        MatSnackBar,
        PersistenceService,
        RawTextService,
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: AuthInterceptor,
            deps: [HttpCommonService, PersistenceService, Router]
        },
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: ResponseInterceptor,
            deps: [HttpCommonService, PersistenceService]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

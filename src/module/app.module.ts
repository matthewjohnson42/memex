import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

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
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ConfigService} from '../service/config.service';
import {HttpCommonService} from '../service/http/http-common.service';

@NgModule({
    declarations: [
        AppComponent,
        MainHeaderComponent,
        EntryScreenComponent,
        SearchQueryScreenComponent,
        SearchResultScreenComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MaterialModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    exports: [],
    providers: [
        AuthService,
        ConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: (configService: ConfigService) => () => configService.load(),
            deps: [ConfigService, HttpClient],
            multi: true
        },
        HttpCommonService,
        RawTextService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

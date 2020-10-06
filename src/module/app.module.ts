import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from '../app/app.component';
import {MainHeaderComponent} from '../app/main-header/main-header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {EntryScreenComponent} from '../app/entry-screen/entry-screen.component';
import {SearchScreenComponent} from '../app/search/search-screen/search-screen.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SearchResultScreenComponent} from '../app/search/search-result-screen/search-result-screen.component';
import {AuthService} from '../service/auth-service';
import {RawTextService} from '../service/raw-text-service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        MainHeaderComponent,
        EntryScreenComponent,
        SearchScreenComponent,
        SearchResultScreenComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        MaterialModule,
        ReactiveFormsModule
    ],
    exports: [],
    providers: [AuthService, RawTextService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

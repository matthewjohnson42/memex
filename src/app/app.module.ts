import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainHeaderComponent} from './main-header/main-header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material-module/material.module";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        MainHeaderComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        MaterialModule,
        ReactiveFormsModule
    ],
    exports: [],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

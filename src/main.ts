import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './module/app.module';
import {enableProdMode} from '@angular/core';

const request = new XMLHttpRequest();
request.open('GET', 'assets/config.json', false);
request.send(null);
const responseBody = JSON.parse(request.response);

if ( responseBody.production === true ) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

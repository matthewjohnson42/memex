import {Component} from '@angular/core';
import {UiRoutes} from '../../const/ui-routes';

@Component({
    selector: 'app-main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent {

    entryRoute: string;
    entrySearchRoute: string;

    constructor() {
        this.entryRoute = UiRoutes.entry;
        this.entrySearchRoute = UiRoutes.entrySearch;
    }

}

import {Component, EventEmitter} from '@angular/core';
import {UiRoutes} from '../../const/ui-routes';

@Component({
    selector: 'app-main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent {

    displayIsEntryScreen: boolean;
    entryRoute: string;
    entrySearchRoute: string;
    newEntryEvent: EventEmitter<any>;

    constructor() {
        this.displayIsEntryScreen = false;
        this.entryRoute = UiRoutes.entry;
        this.entrySearchRoute = UiRoutes.entrySearch;
        this.newEntryEvent = new EventEmitter();
    }

    newEntry(): void {
        this.newEntryEvent.emit(null);
    }

}

import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MainHeaderComponent} from './main-header/main-header.component';
import {Router, RouterOutlet} from '@angular/router';
import {EntryScreenComponent} from './entry-screen/entry-screen.component';

/**
 * Root component for the Angular app.
 * Contains references to the main-header component, and a pane populated from the routerOutlet.
 * Panes are:
 *  login-screen
 *  entry-screen for entering text documents, auto saved on a timer
 *  search-query-screen for querying the elastic search DB of memex-server
 *  search-result-screen for displaying search results and loading them into the entry screen
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

    router: Router;

    activeComponent: any;
    @ViewChild(MainHeaderComponent) mainHeaderComponent: MainHeaderComponent;
    @ViewChild(RouterOutlet) routerOutlet: RouterOutlet;
    title = 'memex-ui';

    constructor(router: Router) {
        this.router = router;
    }

    ngAfterViewInit() {
        this.mainHeaderComponent.newEntryEvent.subscribe(event => {
            if (this.activeComponent instanceof EntryScreenComponent) {
                this.activeComponent.reInitComponent();
            }
        });
        this.routerOutlet.activateEvents.subscribe(component => {
            this.activeComponent = component;
            this.mainHeaderComponent.displayIsEntryScreen = component instanceof EntryScreenComponent;
        });
    }

}

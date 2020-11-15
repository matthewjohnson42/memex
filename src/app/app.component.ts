import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MainHeaderComponent} from './main-header/main-header.component';
import {Router, RouterOutlet} from '@angular/router';
import {EntryScreenComponent} from './entry-screen/entry-screen.component';

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
    title = 'personal-memex-ui';

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

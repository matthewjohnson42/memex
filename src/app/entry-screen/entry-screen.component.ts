import {Component, OnInit} from '@angular/core';
import {RawTextService} from '../../service/raw-text-service';

@Component({
    selector: 'app-entry-screen',
    templateUrl: './entry-screen.component.html',
    styleUrls: ['./entry-screen.component.css']
})
export class EntryScreenComponent implements OnInit {

    entryService: RawTextService; // call should be based on rxjs interval

    constructor(entryService: RawTextService) {
        this.entryService = entryService;
    }

    ngOnInit(): void {
    }
}

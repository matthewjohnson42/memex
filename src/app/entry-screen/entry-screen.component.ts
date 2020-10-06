import {Component, OnInit} from '@angular/core';
import {RawTextService} from '../../service/raw-text.service';

@Component({
    selector: 'app-entry-screen',
    templateUrl: './entry-screen.component.html',
    styleUrls: ['./entry-screen.component.css']
})
export class EntryScreenComponent implements OnInit {

    rawTextService: RawTextService; // call should be based on rxjs interval

    constructor(rawTextService: RawTextService) {
        this.rawTextService = rawTextService;
    }

    ngOnInit(): void {
    }
}

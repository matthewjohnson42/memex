import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {RawTextService} from '../../service/data/raw-text.service';

@Component({
    selector: 'app-entry-screen',
    templateUrl: './entry-screen.component.html',
    styleUrls: ['./entry-screen.component.css']
})
export class EntryScreenComponent implements OnInit, OnDestroy {

    textAreaValue: string;
    id: string;
    rawTextService: RawTextService;
    timeInterval: Subscription;

    constructor(rawTextService: RawTextService) {
        this.rawTextService = rawTextService;
    }

    ngOnInit() {
        this.timeInterval = interval(5000).subscribe(next => {
            if (this.id && this.textAreaValue) {
                this.rawTextService.put(this.id, this.textAreaValue).subscribe();
            } else if (this.textAreaValue) {
                this.rawTextService.post(this.textAreaValue).subscribe(next => {
                    this.id = next.id;
                });
            }
        });
    }

    ngOnDestroy() {
        this.timeInterval.unsubscribe();
    }

}

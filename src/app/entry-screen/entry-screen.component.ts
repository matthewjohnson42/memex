import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, of, Subscription} from 'rxjs';
import {RawTextService} from '../../service/data/raw-text.service';
import {PersistenceService} from '../../service/data/persistence.service';
import {RawText} from '../../data/raw-text';

/**
 * Screen for displaying and editing a text document. Saves on a time interval.
 */
@Component({
    selector: 'app-entry-screen',
    templateUrl: './entry-screen.component.html',
    styleUrls: ['./entry-screen.component.css']
})
export class EntryScreenComponent implements OnInit, OnDestroy {

    persistenceService: PersistenceService;
    rawTextService: RawTextService;

    id: string;
    previousTextAreaValue: string;
    textAreaValue: string;
    timeInterval: Subscription;

    constructor(persistenceService: PersistenceService, rawTextService: RawTextService) {
        this.rawTextService = rawTextService;
        this.persistenceService = persistenceService;
    }

    ngOnInit() {
        // todo update search selection to be passed via route path rather than application memory
        const searchSelection: RawText = this.persistenceService.loadRawTextSearchSelection();
        const rawTextRequest: RawText = this.persistenceService.loadRawTextRequest();
        if ( searchSelection && ! rawTextRequest ) { // state set by search-result-screen
            this.id = searchSelection.id;
            this.textAreaValue = searchSelection.textContent;
        } else if ( rawTextRequest ) { // any request that had been previously persisted
            this.id = rawTextRequest.id;
            this.textAreaValue = searchSelection.textContent;
        }
        this.timeInterval = interval(5000).subscribe(timeInterval => {
            this.persistEntry();
            this.previousTextAreaValue = this.textAreaValue;
        });
    }

    ngOnDestroy() {
        this.persistEntry();
        this.timeInterval.unsubscribe();
    }

    public reInitComponent(): void {
        // todo update to RxJS pipe
        of(this.persistEntry()).subscribe(next => {
            this.persistenceService.persistRawTextRequest(undefined).subscribe();
            this.id = '';
            this.previousTextAreaValue = '';
            this.textAreaValue = '';
        });
    }

    private persistEntry(): void {
        if (this.textAreaValue !== this.previousTextAreaValue) {
            if (this.id) {
                this.rawTextService.put(this.id, this.textAreaValue).subscribe();
            } else {
                this.rawTextService.post(this.textAreaValue).subscribe(response => {
                    this.id = this.persistenceService.loadRawTextRequest().id;
                });
            }
        }
    }

}

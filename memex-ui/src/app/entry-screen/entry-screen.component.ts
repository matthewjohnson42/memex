import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, of, Subscription} from 'rxjs';
import {RawTextService} from '../../service/data/raw-text.service';
import {PersistenceService} from '../../service/data/persistence.service';
import {RawTextDto} from '../../dto/raw-text-dto';

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
        // todo update search selection to be passed via router/url path rather than application memory
        const searchSelection: RawTextDto = this.persistenceService.loadRawTextSearchSelection();
        const rawTextRequest: RawTextDto = this.persistenceService.loadRawTextRequest();
        if ( searchSelection && ! rawTextRequest ) { // load value set by search-result-screen
            this.id = searchSelection.id;
            this.textAreaValue = searchSelection.textContent;
        } else if ( rawTextRequest ) { // load any request that had been previously persisted
            this.id = rawTextRequest.id;
            this.textAreaValue = rawTextRequest.textContent;
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
        // todo update to RxJS concatenation of observables
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

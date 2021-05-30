import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PersistenceService} from '../../../service/data/persistence.service';
import {RawTextDto} from '../../../dto/raw-text-dto';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {PageableDto} from '../../../dto/pageable-dto';
import {Router} from '@angular/router';
import {UiRoutes} from '../../../const/ui-routes';
import {RawTextService} from '../../../service/data/raw-text.service';
import {RawTextSearchResponseDto} from '../../../dto/raw-text-search-response-dto';

/**
 * Displays search results and allows for a specified result to be loaded into PersistenceService
 * and the entry screen routed to. On load, the entry screen displays the content from PersistenceService.
 */
@Component({
    selector: 'app-search-result-screen',
    templateUrl: './search-result-screen.component.html',
    styleUrls: ['./search-result-screen.component.css']
})
export class SearchResultScreenComponent implements OnInit, OnDestroy {

    persistenceService: PersistenceService;
    rawTextService: RawTextService;
    router: Router;

    dataSource: MatTableDataSource<RawTextSearchResponseDto> = new MatTableDataSource<RawTextSearchResponseDto>();
    displayedColumns: Array<string> = ['gloss', 'createDate', 'updateDate'];
    page: PageableDto<RawTextSearchResponseDto>;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(persistenceService: PersistenceService, rawTextService: RawTextService, router: Router) {
        this.persistenceService = persistenceService;
        this.rawTextService = rawTextService;
        this.router = router;
    }

    ngOnInit(): void {
        this.page = this.persistenceService.loadRawTextSearchResponse();
        if ( this.page ) {
            this.dataSource.data = this.page.content;
            this.dataSource.paginator = this.paginator;
        } else {
            this.router.navigateByUrl(UiRoutes.search).then();
        }
    }

    ngOnDestroy(): void {
        // todo update to RxJS concatenation of observables
        this.persistenceService.persistRawTextSearchResponse(undefined).subscribe(next2 => {
            this.persistenceService.persistRawTextSearchRequest(undefined).subscribe(next3 => { });
        });
    }

    updatePage(event: PageEvent): void {
        this.rawTextService.searchFromPrevious(event.pageIndex).subscribe(next => {
            this.page = this.persistenceService.loadRawTextSearchResponse();
            this.dataSource.data = this.persistenceService.loadRawTextSearchResponse().content;
        });
    }

    select(rawTextResponse: RawTextDto): void {
        // todo update to RxJS concatenation of observables
        this.persistenceService.persistRawTextSearchSelection(rawTextResponse).subscribe(next0 => {
            this.persistenceService.persistRawTextRequest(undefined).subscribe(next1 => {
                this.router.navigateByUrl(UiRoutes.entry).then();
            });
        });
    }

}

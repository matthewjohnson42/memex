import {Component, OnInit, ViewChild} from '@angular/core';
import {PersistenceService} from '../../../service/data/persistence.service';
import {RawText} from '../../../data/raw-text';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Pageable} from '../../../data/pageable';
import {Router} from '@angular/router';
import {UiRoutes} from '../../../const/ui-routes';
import {RawTextService} from '../../../service/data/raw-text.service';

@Component({
    selector: 'app-search-result-screen',
    templateUrl: './search-result-screen.component.html',
    styleUrls: ['./search-result-screen.component.css']
})
export class SearchResultScreenComponent implements OnInit {

    persistenceService: PersistenceService;
    rawTextService: RawTextService;
    router: Router;

    dataSource: MatTableDataSource<RawText> = new MatTableDataSource<RawText>();
    displayedColumns: Array<string> = ['gloss', 'createDate', 'updateDate'];
    page: Pageable<RawText>;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(persistenceService: PersistenceService, rawTextService: RawTextService, router: Router) {
        this.persistenceService = persistenceService;
        this.rawTextService = rawTextService;
        this.router = router;
    }

    ngOnInit(): void {
        this.page = this.persistenceService.getRawTextSearchResponse();
        if ( this.page ) {
            this.dataSource.data = this.page.content;
            this.dataSource.paginator = this.paginator;
        } else {
            this.router.navigateByUrl(UiRoutes.entrySearch).then();
        }
    }

    updatePage(event: PageEvent): void {
        this.rawTextService.searchFromPrevious(event.pageIndex).subscribe(next => {
            this.dataSource.data = this.persistenceService.getRawTextSearchResponse().content;
        });
    }

    select(rawTextResponse: RawText) {
        console.log(rawTextResponse);
        this.persistenceService.setRawTextSearchSelection(rawTextResponse);
        this.router.navigateByUrl(UiRoutes.entry).then();
    }

}

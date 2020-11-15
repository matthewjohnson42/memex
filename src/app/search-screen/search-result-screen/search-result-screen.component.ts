import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PersistenceService} from '../../../service/data/persistence.service';
import {RawText} from '../../../data/raw-text';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Pageable} from '../../../data/pageable';
import {Router} from '@angular/router';
import {UiRoutes} from '../../../const/ui-routes';

@Component({
    selector: 'app-search-result-screen',
    templateUrl: './search-result-screen.component.html',
    styleUrls: ['./search-result-screen.component.css']
})
export class SearchResultScreenComponent implements OnInit, AfterViewInit {

    persistenceService: PersistenceService;
    router: Router;

    displayedColumns: Array<string> = ['gloss', 'createDate', 'updateDate'];
    dataSource: MatTableDataSource<RawText> = new MatTableDataSource<RawText>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    page: Pageable<RawText>;

    constructor(persistenceService: PersistenceService, router: Router) {
        this.persistenceService = persistenceService;
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

    ngAfterViewInit(): void {
        this.paginator.pageIndex = this.page.number;
        this.paginator.pageSize = this.page.size;
        this.paginator.length = this.page.totalElements;
    }

}

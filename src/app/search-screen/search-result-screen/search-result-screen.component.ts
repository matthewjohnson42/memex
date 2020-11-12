import {Component, OnInit} from '@angular/core';
import {PersistenceService} from '../../../service/data/persistence.service';
import {RawText} from '../../../data/raw-text';
import {Pageable} from '../../../data/pageable';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-search-result-screen',
    templateUrl: './search-result-screen.component.html',
    styleUrls: ['./search-result-screen.component.css']
})
export class SearchResultScreenComponent implements OnInit {

    persistenceService: PersistenceService;

    dataSource: MatTableDataSource<RawText>;
    searchResults: Pageable<RawText>;

    constructor(persistenceService: PersistenceService) {
        this.persistenceService = persistenceService;
    }

    ngOnInit(): void {
        this.searchResults = this.persistenceService.getRawTextSearchResponse();
        console.log(this.searchResults);
    }

}

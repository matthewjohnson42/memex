import {Component, OnInit} from '@angular/core';
import {RawTextService} from '../../../service/data/raw-text.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-retrieval-screen',
    templateUrl: './search-query-screen.component.html',
    styleUrls: ['./search-query-screen.component.css']
})
export class SearchQueryScreenComponent implements OnInit {

    rawTextService: RawTextService;
    router: Router;
    startDate: Date;
    endDate: Date;
    searchString: string;

    constructor(rawTextService: RawTextService, router: Router) {
        this.rawTextService = rawTextService;
        this.router = router;
    }

    ngOnInit(): void {
    }

    setStartDate(startDate): void {
        this.startDate = startDate.value;
    }

    setEndDate(endDate): void {
        this.endDate = endDate.value;
    }

    search(): void {
        this.rawTextService.search(this.searchString, this.startDate, this.endDate).subscribe(next => {
            this.router.navigate(['entrySearchResult'], {}).then();
        });
    }

}

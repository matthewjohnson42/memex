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

    constructor(rawTextService: RawTextService, router: Router) {
        this.rawTextService = rawTextService;
        this.router = router;
    }

    ngOnInit(): void {
    }

    search(): void {
        this.rawTextService.getPage(10, 0).subscribe(next => {
            this.router.navigate(['entrySearchResult'], {}).then();
        });
    }

}

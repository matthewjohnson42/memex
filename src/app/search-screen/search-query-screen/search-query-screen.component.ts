import {Component, OnInit} from '@angular/core';
import {RawTextService} from '../../../service/data/raw-text.service';

@Component({
    selector: 'app-retrieval-screen',
    templateUrl: './search-query-screen.component.html',
    styleUrls: ['./search-query-screen.component.css']
})
export class SearchQueryScreenComponent implements OnInit {

    rawTextService: RawTextService;

    constructor(rawTextService: RawTextService) {
        this.rawTextService = rawTextService;
    }

    ngOnInit(): void {
    }

    search(): void {
        this.rawTextService.getPage(10, 0).subscribe(
            next => {
                console.log(next);
            });
    }

}

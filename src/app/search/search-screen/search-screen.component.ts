import {Component, OnInit} from '@angular/core';
import {RawTextService} from '../../../service/raw-text-service';
import {RawText} from '../../../data/raw-text';

@Component({
    selector: 'app-retrieval-screen',
    templateUrl: './search-screen.component.html',
    styleUrls: ['./search-screen.component.css']
})
export class SearchScreenComponent implements OnInit {

    entryService: RawTextService;
    entries: RawText;

    constructor(entryService: RawTextService) {
        this.entryService = entryService;
    }

    ngOnInit(): void {
    }

    search(): void {
        const entryPage = this.entryService.getPage(10, 0);
        console.log(entryPage);
    }

}

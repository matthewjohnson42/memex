import {Component} from '@angular/core';
import {RawTextService} from '../../../service/data/raw-text.service';
import {Router} from '@angular/router';
import {UiRoutes} from '../../../const/ui-routes';
import {FormBuilder} from '@angular/forms';

/**
 * Screen for specifying the content of a serach request made to memex-service
 */
@Component({
    selector: 'app-retrieval-screen',
    templateUrl: './search-query-screen.component.html',
    styleUrls: ['./search-query-screen.component.css']
})
export class SearchQueryScreenComponent {

    searchForm = this.formBuilder.group({
        endDate: '',
        startDate: '',
        searchString: ''
    });

    constructor(private formBuilder: FormBuilder,
                private rawTextService: RawTextService,
                private router: Router) { }

    search(): void {
        this.rawTextService.search(this.searchForm.value.searchString,
                                   this.searchForm.value.startDate,
                                   this.searchForm.value.endDate).subscribe(next => {
            this.router.navigateByUrl(UiRoutes.searchResult).then();
        });
    }

}

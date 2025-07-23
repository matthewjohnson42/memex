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
        const startDate = this.searchForm.value.startDate ? new Date(this.searchForm.value.startDate) : undefined;
        const endDate = this.searchForm.value.endDate ? new Date(this.searchForm.value.endDate) : undefined;
        
        this.rawTextService.search(this.searchForm.value.searchString || '',
                                   startDate,
                                   endDate).subscribe(next => {
            this.router.navigateByUrl(UiRoutes.searchResult).then();
        });
    }

}

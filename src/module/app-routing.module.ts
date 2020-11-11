import {NgModule} from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {EntryScreenComponent} from '../app/entry-screen/entry-screen.component';
import {SearchQueryScreenComponent} from '../app/search-screen/search-query-screen/search-query-screen.component';
import {SearchResultScreenComponent} from '../app/search-screen/search-result-screen/search-result-screen.component';

const routes: Routes = [
    {path: 'entry', component: EntryScreenComponent},
    {path: 'entrySearch', component: SearchQueryScreenComponent},
    {path: 'entrySearchResult', component: SearchResultScreenComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {
}

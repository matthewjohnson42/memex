import {NgModule} from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {EntryScreenComponent} from '../app/entry-screen/entry-screen.component';
import {SearchQueryScreenComponent} from '../app/search-screen/search-query-screen/search-query-screen.component';
import {SearchResultScreenComponent} from '../app/search-screen/search-result-screen/search-result-screen.component';
import {UiRoutes} from '../const/ui-routes';

const routes: Routes = [
    {path: UiRoutes.entry, component: EntryScreenComponent},
    {path: UiRoutes.entrySearch, component: SearchQueryScreenComponent},
    {path: UiRoutes.entrySearchResult, component: SearchResultScreenComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {
}

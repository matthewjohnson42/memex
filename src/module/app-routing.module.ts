import {NgModule} from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {EntryScreenComponent} from '../app/entry-screen/entry-screen.component';
import {SearchQueryScreenComponent} from '../app/search-screen/search-query-screen/search-query-screen.component';

const routes: Routes = [
    {path: 'entry', component: EntryScreenComponent},
    {path: 'entryRetrieval', component: SearchQueryScreenComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {
}

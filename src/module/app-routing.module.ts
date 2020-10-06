import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EntryScreenComponent} from '../app/entry-screen/entry-screen.component';
import {SearchScreenComponent} from '../app/search/search-screen/search-screen.component';

const routes: Routes = [
    {path: 'entry', component: EntryScreenComponent},
    {path: 'entryRetrieval', component: SearchScreenComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EntryScreenComponent} from '../app/entry-screen/entry-screen.component';
import {SearchQueryScreenComponent} from '../app/search-screen/search-query-screen/search-query-screen.component';
import {SearchResultScreenComponent} from '../app/search-screen/search-result-screen/search-result-screen.component';
import {UiRoutes} from '../const/ui-routes';
import {LoginScreenComponent} from '../app/login-screen/login-screen.component';
import {AuthService} from '../service/auth.service';

const routes: Routes = [
    {path: UiRoutes.login, component: LoginScreenComponent},
    {path: UiRoutes.entry, component: EntryScreenComponent, canActivate: [AuthService]},
    {path: UiRoutes.search, component: SearchQueryScreenComponent, canActivate: [AuthService]},
    {path: UiRoutes.searchResult, component: SearchResultScreenComponent, canActivate: [AuthService]}
];

/**
 * Module that specifies URI routing behavior
 */
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthService]
})
export class AppRoutingModule {
}

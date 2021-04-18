import {Component} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {UiRoutes} from '../../const/ui-routes';
import {PersistenceService} from '../../service/data/persistence.service';

/**
 * The login screen, allowing for authentication with the memex-service
 */
@Component({
    selector: 'app-login-screen',
    templateUrl: './login-screen.component.html',
    styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent {

    authService: AuthService;
    persistenceService: PersistenceService;
    router: Router;

    username: string;
    password: string;

    constructor(authService: AuthService, persistenceService: PersistenceService, router: Router) {
        this.authService = authService;
        this.persistenceService = persistenceService;
        this.router = router;
    }

    login(): void {
        this.authService.login(this.username, this.password).subscribe(next => {
            this.router.navigateByUrl(UiRoutes.entry).then();
        });
    }

}

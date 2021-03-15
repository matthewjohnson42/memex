import {Component} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {UiRoutes} from '../../const/ui-routes';

@Component({
    selector: 'app-login-screen',
    templateUrl: './login-screen.component.html',
    styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent {

    authService: AuthService;
    router: Router;

    username: string;
    password: string;

    constructor(authService: AuthService, router: Router) {
        this.authService = authService;
    }

    login(): void {
        this.authService.login(this.username, this.password).subscribe(next => {
            this.router.navigateByUrl(UiRoutes.entry).then();
        });
    }

}

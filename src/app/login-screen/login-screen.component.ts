import {Component} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {UiRoutes} from '../../const/ui-routes';
import {PersistenceService} from '../../service/data/persistence.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AuthRequestDto} from '../../dto/auth-request-dto';

/**
 * The login screen, allowing for authentication with the memex-service
 */
@Component({
    selector: 'app-login-screen',
    templateUrl: './login-screen.component.html',
    styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent {

    loginForm = this.formBuilder.group({
        username: '',
        password: ''
    });

    constructor(private authService: AuthService,
                private formBuilder: FormBuilder,
                private persistenceService: PersistenceService,
                private router: Router) { }

    login(): void {
        this.authService.login(this.loginForm.value as AuthRequestDto).subscribe(next => {
            this.router.navigateByUrl(UiRoutes.entry).then();
        });
    }

}

import {Component, OnInit} from '@angular/core';
import {APP_CONSTANTS} from '../../../shared/constants/app-constants';
import {AuthService} from '../../../shared/services/auth.service';
import {UtilsService} from '../../../shared/services/utils.service';
import {Router} from '@angular/router';
import {SessionService} from '../../../shared/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: any = {};

  constructor(private _authService: AuthService,
              private _utilService: UtilsService,
              private _router: Router,
              private  _sessionService: SessionService) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this._authService.login(this.credentials).subscribe(response => {
      const data = response[APP_CONSTANTS.FIELD_DATA];
      if (data.valid) {
        this._utilService.toast('Successfully Signed in!');
        this._router.navigate(['/auth/second-factor']);
      } else if (!data.valid && response.errors) {
        this._utilService.toast(response.errors, 'Error!', 'error');
      } else {
        this._utilService.toast('Couldn\'t Login! Try Again Letter', 'Error!', 'error');
      }
    });
  }
}

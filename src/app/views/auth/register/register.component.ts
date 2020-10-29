import {Component, OnInit} from '@angular/core';
import {APP_CONSTANTS} from '../../../shared/constants/app-constants';
import {AuthService} from '../../../shared/services/auth.service';
import {SessionService} from '../../../shared/services/session.service';
import {Router} from '@angular/router';
import {UtilsService} from '../../../shared/services/utils.service';
import {User} from '../../../shared/models/User';
import {ROLES} from '../../../shared/constants/enum-constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private _authService: AuthService,
              private _sessionService: SessionService,
              private _router: Router,
              private _utilService: UtilsService) {
  }

  user: User = new User();

  ngOnInit(): any {
  }

  submitRegister(): any {
    const reqBody = {};
    reqBody[APP_CONSTANTS.FIELD_USER_DETAILS] = this.user;
    this._authService.registerUser(reqBody).subscribe(response => {
      const data = response[APP_CONSTANTS.FIELD_DATA];
      if (data && data.user_details) {
        this._utilService.toast('Registration Successfully Completed!');
        this._sessionService.setType(data.user_details.role);
        this._utilService.setLocalStorage(APP_CONSTANTS.FIELD_USER_ID, data.user_details.id);
        this._sessionService.saveCompleteUser(data.user_details);
        this._router.navigate(['/public/']);
      } else if (!data.user_details && response[APP_CONSTANTS.FIELD_ERRORS]) {
        this._utilService.toast(response[APP_CONSTANTS.FIELD_ERRORS], 'Error!', 'error');
      } else if (!data.user_details && data.error) {
        this._utilService.toast(data.message, 'Error!', 'error');
      } else {
        this._utilService.toast('Registration Failed! Try Again Letter', 'Error!', 'error');
      }
    });
  }

  setSeller(): void {
    this.user.role = ROLES.SELLER.code;
  }

  setCustomer(): void {
    this.user.role = ROLES.CUSTOMER.code;
  }
}

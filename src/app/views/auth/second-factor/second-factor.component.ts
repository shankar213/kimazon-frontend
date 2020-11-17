import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { SessionService } from '../../../shared/services/session.service';
import { Router } from '@angular/router';
import { UtilsService } from '../../../shared/services/utils.service';
import { User } from '../../../shared/models/User';
import { APP_CONSTANTS } from '../../../shared/constants/app-constants';

@Component({
  selector: 'app-second-factor',
  templateUrl: './second-factor.component.html',
  styleUrls: ['./second-factor.component.css']
})
export class SecondFactorComponent implements OnInit {
  constructor(private _authService: AuthService,
              private _sessionService: SessionService,
              private _router: Router,
              private _utilService: UtilsService) {
  }

  securityCode: string;
  validCode: string;
  user: User = new User();

  ngOnInit(): void {
    this.user = this._sessionService.getUser();
    this.sendSecurityCode();
  }

  private sendSecurityCode() {
    const body = {email: this.user.email};
    this._authService.sendEmailForVerification(body).subscribe((response: any) => {

      if (response && response.data && response.data.security_code) {
        this._utilService.toast('Mail Sent Successfully with the Security Code');
        this.validCode = response.data.security_code;
        this._utilService.setLocalStorage('security-code', this.validCode);
      } else {
        this._utilService.toast(response[APP_CONSTANTS.FIELD_ERRORS], 'Error!', 'error');
      }
    });
  }

  validateSecurityCode(): void {
    this.validCode = this._utilService.getLocalStorageItem('security-code');

    if (this.securityCode === this.validCode) {
      this._utilService.toast('Security Code Verified');
      if (this._sessionService.isSeller()) {
        this._router.navigate(['/partner']);
      } else if (this._sessionService.isCustomer()) {
        this._router.navigate(['/public']);
      } else if (this._sessionService.isAdmin()) {
        this._router.navigate(['/admin']);
      }

    } else {
      this._utilService.toast('Invalid Security Code', 'Error', 'error');

    }
  }
}

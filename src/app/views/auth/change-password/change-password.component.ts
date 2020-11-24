import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionService} from "../../../shared/services/session.service";
import {AuthService} from "../../../shared/services/auth.service";
import {UtilsService} from "../../../shared/services/utils.service";

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  token: string;
  passwordData: any = {};

  constructor(private route: ActivatedRoute, private _sessionService: SessionService,
              private _authService: AuthService, private _utilService: UtilsService,
              private _router: Router) {
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.getUserDetails();
  }

  getUserDetails() {
  }

  changePassword() {
    console.log(this.passwordData);
    this.passwordData.email = this._sessionService.getUser().email;
    if (this.passwordData.password === this.passwordData.cpassword) {
      this._authService.changePassword(this.passwordData).subscribe(response => {
        if (response.data.email) {
          this._utilService.toast('Password has been changed successfully!');
          if (this._sessionService.isSeller()) {
            this._router.navigate(['/partner']);
          } else if (this._sessionService.isCustomer()) {
            this._router.navigate(['/public']);
          } else if (this._sessionService.isAdmin()) {
            this._router.navigate(['/admin']);
          }
        }
      });
    } else {
      this._utilService.toast('Check your password entered!', 'Error!', 'error');
    }
  }
}

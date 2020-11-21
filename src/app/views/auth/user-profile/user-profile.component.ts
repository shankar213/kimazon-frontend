import { Component, OnInit } from '@angular/core';
import {User} from "../../../shared/models/User";
import {UserService} from "../../../shared/services/user.service";
import {SessionService} from "../../../shared/services/session.service";
import {UtilsService} from "../../../shared/services/utils.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  isUpdateMode = false;
  user: User = new User();

  constructor(private _userService: UserService,
              private _sessionService: SessionService, private _utilService: UtilsService,
              private _router: Router) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    this._userService.getUserDetails(this._sessionService.getUser().id).subscribe(response => {
      this.user = response.data.user;
      console.log('User', this.user);
    })
  }

  updateProfile() {
    const user = {
      user: {
        first_name: this.user.first_name,
        last_name : this.user.last_name,
        phone: this.user.phone
      }
    };
    console.log(user);
    if (this.user.first_name === '' || this.user.last_name === '' || this.user.phone === '') {
      this._utilService.toast('Please enter the details', 'Error!', 'error');
    } else {
      this._userService.updateUserProfile(user, this.user.id).subscribe(response => {
        if (response.data.user.id) {
          this._utilService.toast('User profile has been successfully updated!');
          if (this._sessionService.isSeller()) {
            this._router.navigate(['/partner']);
          } else if (this._sessionService.isCustomer()) {
            this._router.navigate(['/public']);
          } else if (this._sessionService.isAdmin()) {
            this._router.navigate(['/admin']);
          }
        }
      });
    }
  }

}

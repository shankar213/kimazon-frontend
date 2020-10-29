import {Injectable} from '@angular/core';
import {APP_CONSTANTS} from '../constants/app-constants';
import {User} from '../models/User';
import {UtilsService} from './utils.service';
import {Router} from '@angular/router';
import {ROLES} from '../constants/enum-constants';


@Injectable()
export class SessionService {
  constructor(private _utilService: UtilsService,
              private _router: Router) {
  }

  saveCompleteUser(user: User): any {
    localStorage.setItem(APP_CONSTANTS.FIELD_USER_DETAILS, JSON.stringify(user));
  }

  getUser(): User {
    const userString = window.localStorage[APP_CONSTANTS.FIELD_USER_DETAILS];
    let user: User;
    if (userString) {
      user = JSON.parse(userString);
    }
    return user;
  }
  setType(type: string): void {
    this._utilService.setLocalStorage('role', type);
  }

  logout(): any {
    this.destroySession();
    this._router.navigate(['/public']);
  }

  destroySession(): any {
    window.localStorage.clear();
  }

  isSeller(): any {
    return this._utilService.getLocalStorageItem(APP_CONSTANTS.FIELD_ROLE) === ROLES.SELLER.code;
  }

  isCustomer(): any {
    return this._utilService.getLocalStorageItem(APP_CONSTANTS.FIELD_ROLE) === ROLES.CUSTOMER.code;
  }
  addSessionItem(key, value): any {
    window.sessionStorage.setItem(key, value);
  }

  getSessionItem(key): any {
    return window.sessionStorage.getItem(key);
  }

  removeSessionItem(key): any {
    window.sessionStorage.removeItem(key);

  }
}

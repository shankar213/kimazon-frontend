import {Injectable} from '@angular/core';
import {APP_CONSTANTS} from '../constants/app-constants';
import {User} from '../models/User';
import {UtilsService} from './utils.service';
import {Router} from '@angular/router';


@Injectable()
export class SessionService {
  constructor(private _utilService: UtilsService,
              private _router: Router) {
  }

  saveCompleteUser(user: User): any {
    localStorage.setItem(APP_CONSTANTS.FIELD_USER_DETAILS, JSON.stringify(user));
  }

  setType(type: string): void {
    this._utilService.setLocalStorage('role', type);
  }

  logout() {
    this.destroySession();
    this._router.navigate(['/public']);
  }

  destroySession() {
    window.localStorage.clear();
  }
}

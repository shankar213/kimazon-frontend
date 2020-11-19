import {Injectable} from '@angular/core';
import {UtilsService} from './utils.service';
import {SessionService} from './session.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _utilsService: UtilsService,
              private _sessionService: SessionService,
              private _httpClient: HttpClient) {
  }

  getUsers(): any {
    const url = `${this._utilsService.linkGeneration(environment.users, environment.users.get_users)}`;
    return this._utilsService.callGetAPI(url);
  }

  getUserDetails(userId: number) {
    let url = `${this._utilsService.linkGeneration(environment.users, environment.users.get_user_details)}`;
    url = url.replace(':user_id', userId.toString());
    return this._utilsService.callGetAPI(url);
  }

}

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {APP_CONSTANTS} from '../constants/app-constants';
import {DB_CONSTANTS} from '../constants/db-constants';
import {ToastrService} from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private previousUrl: string = undefined;
  private currentUrl: string = undefined;

  constructor(private http: HttpClient,
              private router: Router,
              private _toasterService: ToastrService) {

    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  /**
   *
   * @param1 {string} param1
   * @param2 {string} param2
   * To generate the link for API call
   */

  linkGeneration(param1, param2 = '', param3 = ''): string {
    // return `${location.protocol}//` + environment.api_host + param1.prefix + param2 + param3;

    // const host = window.location.hostname;
    if (environment.production) {
      return `${location.protocol}//` + environment.api_host + param1.prefix + param2 + param3;

    } else {
      return 'http://' + environment.api_host + ':' + environment.api_host_port + param1.prefix + param2 + param3;
    }
  }

  isLoggedIn() {
    return this.getLocalStorageItem(APP_CONSTANTS.FIELD_USER_ID);
  }

  getLocalStorageItem(key) {
    return localStorage.getItem(key);
  }

  callGetAPI(url): any {
    return this.http.get(url, this.setHeader());
  }

  callPostAPI(url, body): any {
    return this.http.post(url, body, this.setHeader());
  }

  /**
   *
   * To set the headers
   */
  setHeader(): any {
    const headers = {};
    const userCode = sessionStorage.getItem('userCode');
    const authToken = sessionStorage.getItem('authorizationToken');
    headers[APP_CONSTANTS.VALUE_CONTENT_TYPE] = 'application/json';
    if (userCode) {
      headers[DB_CONSTANTS.FIELD_USER_ID] = userCode;
    }
    return headers;
  }


  setLocalStorage(key: any, value: any): any {
    window.localStorage.setItem(key, value);
  }


  toast(message, title = 'Attention', type = 'success'): any {
    if (type === 'success') {
      this._toasterService.success(message, title);
    } else if (type === 'error') {
      this._toasterService.error(message, title);
    }
  }


}

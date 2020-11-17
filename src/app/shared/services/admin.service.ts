import {Injectable} from "@angular/core";
import {UtilsService} from "./utils.service";
import {SessionService} from "./session.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _utilsService: UtilsService,
              private _sessionService: SessionService,
              private _httpClient: HttpClient) {
  }

  getAllUsers(): any {
  }
}

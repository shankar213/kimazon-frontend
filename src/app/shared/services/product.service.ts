import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { environment } from '../../../environments/environment';
import { SessionService } from './session.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

  constructor(private _utilsService: UtilsService,
              private _sessionService: SessionService,
              private _httpClient: HttpClient) {
  }

  getProducts(body) {
    const url = `${this._utilsService.linkGeneration(environment.products, environment.products.get_products)}`;
    console.log(url);
    return this._utilsService.callPostAPI(url, body);
  }

}

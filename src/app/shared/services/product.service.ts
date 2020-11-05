import {Injectable} from '@angular/core';
import {UtilsService} from './utils.service';
import {environment} from '../../../environments/environment';
import {SessionService} from './session.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APP_CONSTANTS} from '../constants/app-constants';
import {DB_CONSTANTS} from '../constants/db-constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _utilsService: UtilsService,
              private _sessionService: SessionService,
              private _httpClient: HttpClient) {
  }

  postFile(fileToUpload: File, productId): Observable<any> {
    let url = `${this._utilsService.linkGeneration(environment.products, environment.products.add_product_image)}`;
    url = url.replace(':product_id', productId);
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload, fileToUpload.name);
    return this._httpClient
      .post(url, formData);
  }


  getProductsForSeller(): any {
    let url = `${this._utilsService.linkGeneration(environment.products, environment.products.products_for_seller)}`;
    url = url.replace(':seller_id', this._utilsService.getLocalStorageItem(APP_CONSTANTS.FIELD_USER_ID));
    return this._utilsService.callGetAPI(url);
  }

  getProducts(body): any {
    const url = `${this._utilsService.linkGeneration(environment.products, environment.products.get_products)}`;
    return this._utilsService.callPostAPI(url, body);
  }

  addProduct(reqBody: any): any {
    const url = `${this._utilsService.linkGeneration(environment.products, environment.products.add_product)}`;
    return this._utilsService.callPostAPI(url, reqBody);
  }
  editProduct(productId: any, reqBody): any {
    let url = `${this._utilsService.linkGeneration(environment.products, environment.products.edit_product)}`;
    url = url.replace(':product_id', productId.toString());
    return this._utilsService.callPutAPI(url, reqBody);
  }

  deleteProduct(productId: number) {
    let url = `${this._utilsService.linkGeneration(environment.products, environment.products.delete_product)}`;
    url = url.replace(':product_id', productId.toString());
    return this._utilsService.callDeleteApi(url);
  }

  getProductDetails(productId: number) {
    let url = `${this._utilsService.linkGeneration(environment.products, environment.products.get_product_details)}`;
    url = url.replace(':product_id', productId.toString());
    return this._utilsService.callGetAPI(url);
  }
}

import {Component, OnInit} from '@angular/core';
import {Product} from '../../../shared/models/Product';
import {APP_CONSTANTS} from '../../../shared/constants/app-constants';
import {SessionService} from '../../../shared/services/session.service';
import {Router} from '@angular/router';
import {UtilsService} from '../../../shared/services/utils.service';
import {ProductService} from '../../../shared/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product: Product = new Product();
  files: File[] = [];
  imageUpload = false;
  skipButtonText = 'Skip This For Now';

  constructor(private _productService: ProductService,
              private _sessionService: SessionService,
              private _router: Router,
              private _utilService: UtilsService) {
  }

  ngOnInit(): void {
    this.product.seller_id = +this._utilService.getLocalStorageItem(APP_CONSTANTS.FIELD_USER_ID);
    if (this._sessionService.getSessionItem('product_id')) {
      this.imageUpload = true;
      this.product = JSON.parse(this._sessionService.getSessionItem('product'));
    }
  }

  addProduct(): void {
    const reqBody = {};
    reqBody[APP_CONSTANTS.FIELD_PRODUCT] = this.product;
    this._productService.addProduct(reqBody).subscribe(response => {
      const data = response[APP_CONSTANTS.FIELD_DATA];
      if (data && data.product) {
        this._utilService.toast('Product Added Successfully !');
        this.imageUpload = true;
        this._sessionService.addSessionItem('product_id', data.product.id);
        this._sessionService.addSessionItem('product', JSON.stringify(data.product));
        this.product = data.product;
        // this._router.navigate(['/partner/products']);
      } else if (!data.product && response[APP_CONSTANTS.FIELD_ERRORS]) {
        this._utilService.toast(response[APP_CONSTANTS.FIELD_ERRORS], 'Error!', 'error');
      } else if (!data.product && data.error) {
        this._utilService.toast(data.message, 'Error!', 'error');
      } else {
        this._utilService.toast('Couldn\'t Login! Try Again Letter', 'Error!', 'error');
      }
    });

  }

  uploadFile(fileToUpload): void {
    console.log(this.product);
    this._productService.postFile(fileToUpload, this.product.id).subscribe(res => {
      const data = res.data;
      // tslint:disable-next-line:triple-equals
      if (res && res.data && res.status_code == '200') {
        this._utilService.toast('Image Uploaded Successfully');
      } else {
        this._utilService.toast(data.message, 'Error!', 'error');

      }
    }, error => {
      this._utilService.toast(error.message, 'Error!', 'error');
      console.log(error);
    });
  }

  onSelect(event): void {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event): void {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  uploadFiles(): void {
    this.files.forEach((file) => {
      this.uploadFile(file);
    });
    this.skipButtonText = 'I\'m done.';
  }

  skipToAllProcuts(): void {
    this._sessionService.removeSessionItem('product');
    this._sessionService.removeSessionItem('product_id');
    this._router.navigate(['/partner/products']);

  }

  onCategorySelected(event: any): void {
    console.log(event);
    this.product.category = event;
  }
}

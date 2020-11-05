import {Component, OnInit} from '@angular/core';
import {Product} from '../../../shared/models/Product';
import {APP_CONSTANTS} from '../../../shared/constants/app-constants';
import {SessionService} from '../../../shared/services/session.service';
import {ActivatedRoute, Router} from '@angular/router';
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
  isEdit = false;
  productId = null;
  skipButtonText = 'Skip This For Now';

  constructor(private _productService: ProductService,
              private _sessionService: SessionService,
              private _router: Router,
              private _activateRoute: ActivatedRoute,
              private _utilService: UtilsService) {
  }

  ngOnInit(): void {
    this._activateRoute.queryParams
      .subscribe(params => {
          this.isEdit = params.edit;
        }
      );
    this._activateRoute.paramMap.subscribe(params => {
      this.productId = params.get('product_id');
    });
    if (this.isEdit) {
      this._productService.getProductDetails(this.productId).subscribe(response => {
        if (!response.data || !response.data.product) {
          this._utilService.toast(response[APP_CONSTANTS.FIELD_ERRORS], 'Error!', 'error');
          return;
        }
        this.product = response.data.product;
      });
    }


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
      this.afterAddEditProduct(response);
    });

  }
  editProduct(): void {
    const reqBody = {};
    reqBody[APP_CONSTANTS.FIELD_PRODUCT] = this.product;
    this._productService.editProduct(this.productId, reqBody).subscribe(response => {
      this.afterAddEditProduct(response);
    });

  }

  uploadFile(fileToUpload): void {
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
    });
  }

  onSelect(event): void {
    this.files.push(...event.addedFiles);
  }

  onRemove(event): void {
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
    this.product.category = event;
  }

  private afterAddEditProduct(response) {
    const data = response[APP_CONSTANTS.FIELD_DATA];
    if (data && data.product) {
      this._utilService.toast(response.status_msg);
      this.imageUpload = true;
      this._sessionService.addSessionItem('product_id', data.product.id);
      this._sessionService.addSessionItem('product', JSON.stringify(data.product));
      this.product = data.product;
    } else if (!data.product && response[APP_CONSTANTS.FIELD_ERRORS]) {
      this._utilService.toast(response[APP_CONSTANTS.FIELD_ERRORS], 'Error!', 'error');
    } else if (!data.product && data.error) {
      this._utilService.toast(data.message, 'Error!', 'error');
    } else {
      this._utilService.toast('Something Went Wrong! Try Again Letter', 'Error!', 'error');
    }
  }
}

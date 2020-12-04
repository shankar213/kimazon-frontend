import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {SessionService} from '../../../shared/services/session.service';
import {Router} from '@angular/router';

import {UtilsService} from '../../../shared/services/utils.service';
import {ProductService} from '../../../shared/services/product.service';
import {APP_CONSTANTS} from '../../../shared/constants/app-constants';
import {Product} from '../../../shared/models/Product';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  @ViewChild(MdbTablePaginationComponent, {static: true}) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  allProducts: Product[] = [];
  filter: any = {};
  pageSize = 10;

  constructor(private _sessionService: SessionService,
              private _router: Router,
              private _productService: ProductService,
              private _utilService: UtilsService,
              private cdRef: ChangeDetectorRef) {
  }

  elements: any = [];
  previous: any = [];
  headElements = ['id', 'name', 'category', 'brand', 'qty'];

  ngOnInit(): void {
    this.filter.role = 'ALL USERS';
    this.getAllProducts();
  }


  private getAllProducts() {
    this._productService.getAllProducts().subscribe((response: any) => {
      const data = response.data;
      if (!data || !data.products) {
        this._utilService.toast('Cannot Load Products! Try Again Later', 'Error!', 'error');
        return;
      }
      this.allProducts = data.products;
      this.mdbTable.setDataSource(this.allProducts);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
      this.resetPager();
    });

  }

  resetPager() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.pageSize);
    this.mdbTablePagination.firstPage();
    this.cdRef.detectChanges();
  }


  suspendOrUnsuspendProduct(product: Product) {
    const updateData = {product: {is_suspended: !product.is_suspended}};
    this._productService.editProduct(product.id, updateData).subscribe(response => {
      const data = response[APP_CONSTANTS.FIELD_DATA];
      if (data && data.product) {
        this._utilService.toast(response.status_msg, product.is_suspended ? 'Activated!' : 'Suspended!');
      } else if (!data.product && response[APP_CONSTANTS.FIELD_ERRORS]) {
        this._utilService.toast(response[APP_CONSTANTS.FIELD_ERRORS], 'Error!', 'error');
      } else if (!data.product && data.error) {
        this._utilService.toast(data.message, 'Error!', 'error');
      } else {
        this._utilService.toast('Something Went Wrong! Try Again Letter', 'Error!', 'error');
      }
      this.getAllProducts();
    });
  }
}

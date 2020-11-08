import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { SessionService } from '../../../shared/services/session.service';
import { Router } from '@angular/router';
import { UtilsService } from '../../../shared/services/utils.service';
import { APP_CONSTANTS } from '../../../shared/constants/app-constants';
import { Product } from '../../../shared/models/Product';

@Component({
    selector: 'app-my-cart',
    templateUrl: './my-cart.component.html',
    styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
    products: Product[] = [];
    cartItemIds: number[];

    constructor(private _productService: ProductService,
                private _sessionService: SessionService,
                private _router: Router,
                private _utilService: UtilsService) {
    }

    ngOnInit(): void {
        const cartString = this._utilService.getLocalStorageItem(APP_CONSTANTS.FIELD_CART_ITEM_IDS);
        this.cartItemIds = cartString ? JSON.parse(cartString) : [];
        this.getProductsInCart();

    }

    removeFromCart(id: number) {
        const index = this.cartItemIds.indexOf(id);
        if (index > -1) {
            this.cartItemIds.splice(index, 1);
        }
        this._utilService.setLocalStorage(APP_CONSTANTS.FIELD_CART_ITEM_IDS, JSON.stringify(this.cartItemIds));
        this.getProductsInCart();
    }

    getProductsInCart() {
        this._productService.getProductsFromCart({ids: this.cartItemIds}).subscribe((response: any) => {
            const data = response.data;
            if (!data || !data.products) {
                this._utilService.toast('Cannot Load Products! Try Again Letter', 'Error!', 'error');
                return;
            }
            this.products = data.products;
        });
    }
}

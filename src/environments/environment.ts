// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_host: 'localhost',
  api_host_port: 8081,
  auth: {
    prefix: '/api/users',
    register: '/register',
    login: '/login',
    send_security_code: '/send-security-code',
    password_reset_email: '/password-change-request',
    change_password: '/change-password'
  },
  users: {
    prefix: '/api/users',
    get_users: '/',
    get_user_details: '/:user_id'
  },
  products: {
    prefix: '/api/products',
    add_product: '/',
    get_products: '/filter',
    get_all_products: '/',
    get_product_details: '/:product_id',
    edit_product: '/:product_id',
    delete_product: '/:product_id',
    add_product_image: '/:product_id/image',
    products_for_seller: '/seller/:seller_id',
    get_products_selectedids: '/selectedids'
  },
  orders: {
    prefix: '/api/orders',
    add_order: '/',
    get_orders_placed_by_user: '/user/:user_id',
    get_orders_for_seller: '/seller/:seller_id',
    fulfil_order: '/:order_id/fulfil'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

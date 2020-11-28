export class Order {
  name: string;
  product_id: number;
  qty: number;
  subtotal: number;
  taxes: number;
  total: number;
  created_on: string;
  unit_price: number;
  items: any[];
  date: string;
  shipping_details: any;
  show: boolean;
}

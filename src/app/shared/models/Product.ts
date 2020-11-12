export class Product {
    id: number;
    name: string;
    brand: string;
    description: string;
    seller_id: number;
    price: number;
    images: string[];
    qty: number;
    category: string;
    cart_qty: number = 1;
}

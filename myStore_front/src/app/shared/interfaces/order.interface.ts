export interface Details {
  productId: number;
  productName: string;
  quantity: number;
  updateStock: number;
  price:number;
  total_purchase_value:number;
}

export interface Order {
  name: string;
  shippingAddress: string;
  city: string;
  date: string;
  isDelivery: boolean;
  price:number;
  id: number;
}

export interface DetailsOrder {
  details: Details[];
  orderId: string;
  total:number;
  date:string
}

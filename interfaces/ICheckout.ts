export interface ICartProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export enum PaymentMethod {
  UPI = "UPI",
  CARDS = "CARDS", // Optionally capitalize enum members; however, consistency is key
}

export interface IOrderDetails {
  products: ICartProduct[];
  paymentMethods: PaymentMethod[]; // Now uses the singular enum name
}

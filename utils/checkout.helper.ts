import { ICartProduct } from "@/interfaces/ICheckout";

export const getSubtotal = (items: ICartProduct[]): number => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

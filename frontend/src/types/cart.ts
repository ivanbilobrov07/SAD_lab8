import { CartProductType } from "./types";

export type CartType = {
  id: string;
  products: CartProductType;
  totalPrice: number;
};

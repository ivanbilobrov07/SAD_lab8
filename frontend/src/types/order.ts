import { CartType } from "./types";

export type OrderType = {
  id: string;
  email: string;
  address: string;
  cart: CartType;
  status: string;
};

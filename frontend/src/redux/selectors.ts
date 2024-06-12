import { RootState } from "./store";

export const selectCart = (state: RootState) => state.cart.data;

export const selectCartIsLoading = (state: RootState) => state.cart.isLoading;

export const selectCartError = (state: RootState) => state.cart.error;

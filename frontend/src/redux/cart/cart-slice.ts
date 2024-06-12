import { createSlice } from "@reduxjs/toolkit";
import {
  addProductToCart,
  changeProductQuantity,
  createCart,
  getCartById,
} from "./cart-api-thunk";

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const isPendingAction = (action) => {
  return action.type.endsWith("/pending");
};

const isFulfilledAction = (action) => {
  return action.type.endsWith("/fulfilled");
};

const handlePending = (state) => {
  state.error = null;
  state.isLoading = true;
};

const handleReject = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const handleFulfilled = (state, { payload }) => {
  state.error = null;
  state.data = payload;
  state.isLoading = false;
};

const handleChangeProductQuantityReject = (state, { payload }) => {
  state.isLoading = false;
  alert(payload);
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(createCart.rejected, handleReject);
    builder.addCase(
      changeProductQuantity.rejected,
      handleChangeProductQuantityReject
    );
    builder.addCase(
      addProductToCart.rejected,
      handleChangeProductQuantityReject
    );
    builder.addCase(getCartById.rejected, handleReject);
    builder.addMatcher(isPendingAction, handlePending);
    builder.addMatcher(isFulfilledAction, handleFulfilled);
  },
});

export const { reducer: cartReducer } = cartSlice;

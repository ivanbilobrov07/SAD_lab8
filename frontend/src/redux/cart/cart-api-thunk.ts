import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type CartProductDataDto = {
  cartId: string;
  productId: string;
  quantity?: number;
};

type CartClearDataDto = {
  cartId: string;
};

export const createCart = createAsyncThunk(
  "cart/createCart",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post("/carts");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Some error");
    }
  }
);

export const getCartById = createAsyncThunk(
  "cart/getCartById",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(`/carts/${id}`);
      return response.data;
    } catch (e) {
      thunkAPI.dispatch(createCart());
      return thunkAPI.rejectWithValue("Some error");
    }
  }
);

export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async (data: CartProductDataDto, thunkAPI) => {
    try {
      const response = await axios.post(`/carts/${data.cartId}/products`, {
        productId: data.productId,
        quantity: data.quantity,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Invalid quantity");
    }
  }
);

export const changeProductQuantity = createAsyncThunk(
  "cart/changeProductQuantity",
  async (data: CartProductDataDto, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/carts/${data.cartId}/products/${data.productId}/update-quantity`,
        {
          quantity: data.quantity,
        }
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Invalid quantity");
    }
  }
);

export const deleteProductFromCart = createAsyncThunk(
  "cart/deleteProductFromCart",
  async (data: CartProductDataDto, thunkAPI) => {
    try {
      const response = await axios.delete(
        `/carts/${data.cartId}/products/${data.productId}`
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Some error");
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (data: CartClearDataDto, thunkAPI) => {
    try {
      const response = await axios.post(`/carts/${data.cartId}/clear`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Some error");
    }
  }
);

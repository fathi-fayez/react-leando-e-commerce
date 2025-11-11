import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@store/index";
import axios from "axios";
import type { TProduct } from "@customTypes/product";

type TResponse = TProduct;

const actGetCartItems = createAsyncThunk(
  "cart/actGetCartItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState } = thunkAPI;
    const { cart } = getState() as RootState;
    const items = cart.items;

    try {
      if (!items.length) {
        return fulfillWithValue([]);
      }

      const products = await Promise.all(
        items.map(async (item) => {
          const res = await axios.get<TResponse>(
            `/products/${item.id}`
          );
          const product = res.data;
          return {
            ...product,
            quantity: item.quantity,
            total: product.price * item.quantity,
          };
        })
      );

      return fulfillWithValue(products);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export default actGetCartItems;

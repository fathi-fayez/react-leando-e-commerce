import { axiosErrorHandler } from "src/utils/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@store/index";
import axios from "axios";
import type { TProduct } from "@customTypes/product";

type TResponse = TProduct;
type TCartItem = { id: number; quantity: number };

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
        items.map(async (item: TCartItem) => {
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
      return rejectWithValue(axiosErrorHandler(error))
    }
  }
);

export default actGetCartItems;

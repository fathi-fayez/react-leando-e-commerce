import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import type { RootState } from "@store/index";

export const actPlaceOrder = createAsyncThunk(
    "orders/actPlaceOrder",
    async (_, thunkAPI) => {
        const { rejectWithValue, getState } = thunkAPI;
        const { cart } = getState() as RootState;

        const orderItems = cart.products.map((el) => ({
            id: el.id,
            title: el.title,
            price: el.price,
            quantity: cart.items[el.id],
        }));

        try {
            const res = await axios.post("/carts/add", {
                userId: 1,
                products: orderItems
            });

            return res.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

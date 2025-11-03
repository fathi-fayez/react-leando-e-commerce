import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { TProduct } from "@customTypes/product";

type TResponse = TProduct[];

const actGetProductsByCategory = createAsyncThunk(
    "products/actGetProductsByCategory",
    async (category: string, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.get<TResponse>(
                `${import.meta.env.VITE_BASE_URL}/products/category/${category}`
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message || error.message);
            } else {
                return rejectWithValue("An unexpected error");
            }
        }
    }
);

export default actGetProductsByCategory;
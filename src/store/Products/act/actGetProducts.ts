import { axiosErrorHandler } from "src/util/index";
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
                `/products/category/${category}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error))
        }
    }
);

export default actGetProductsByCategory;
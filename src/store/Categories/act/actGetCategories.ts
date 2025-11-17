import { axiosErrorHandler } from "src/utils/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { TCategory } from "@customTypes/category";

type TResponse = TCategory[];

const actGetCategories = createAsyncThunk(
    "categories/actGetCategories",
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.get<TResponse>(
                `/products/categories`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error))
        }
    }
);

export default actGetCategories;
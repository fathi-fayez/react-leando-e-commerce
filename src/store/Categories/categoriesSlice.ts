import { createSlice } from '@reduxjs/toolkit'
import actGetCategories from "./act/actGetCategories";
import type { TCategory } from "@customTypes/category";
import type { TLoading } from "@customTypes/shared";

interface ICategoriesState {
    categories: TCategory[];
    loading: TLoading;
    error: string | null;
}

const initialState: ICategoriesState = {
    categories: [],
    loading: 'idle',
    error: null,
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(actGetCategories.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetCategories.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.categories = action.payload;
        });
        builder.addCase(actGetCategories.rejected, (state, action) => {
            state.loading = "failed";
            if (action.payload && typeof action.payload === "string") {
                state.error = action.payload;
            }
        });
    },
})

// Action creators are generated for each case reducer function
export { actGetCategories };
export default categoriesSlice.reducer
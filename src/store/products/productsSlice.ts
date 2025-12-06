import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByCategory from "./act/actGetProducts";
import type { TProduct } from "@customTypes/product";
import type { TLoading } from "@customTypes/shared";
interface IProductsState {
    products: TProduct[];
    loading: TLoading;
    error: string | null;
}

const initialState: IProductsState = {
    products: [],
    loading: "idle",
    error: null,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        productsCleanUp: (state) => {
            state.products = [];

        },
    },
    extraReducers: (builder) => {
        builder.addCase(actGetProductsByCategory.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetProductsByCategory.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.products = action.payload;
        });
        builder.addCase(actGetProductsByCategory.rejected, (state, action) => {
            state.loading = "failed";
            if (action.payload && typeof action.payload === "string") {
                state.error = action.payload;
            }
        });
    },
});

export const { productsCleanUp } = productsSlice.actions;
export { actGetProductsByCategory };
export default productsSlice.reducer;
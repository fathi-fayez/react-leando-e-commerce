import { createSlice } from "@reduxjs/toolkit";
import { actPlaceOrder } from "./act/actPlaceOrder";
import type { TProduct } from "@customTypes/product";
import type { TLoading } from "@customTypes/shared";
interface ICartState {
    products: TProduct[];
    items: { id: number; quantity: number }[];
    loading: TLoading;
    error: string | null;
}

const initialState: ICartState = {
    products: [],
    items: [],
    loading: "idle",
    error: null,
};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(actPlaceOrder.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(actPlaceOrder.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.products = action.payload;
            })
            .addCase(actPlaceOrder.rejected, (state, action) => {
                state.loading = "failed";
                state.error =
                    (action.payload as string) || "Failed to fetch cart products";
            });
    },
});

export { actPlaceOrder };
export default ordersSlice.reducer;
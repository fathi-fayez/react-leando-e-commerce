import { createSlice } from "@reduxjs/toolkit";
import { actPlaceOrder } from "./act/actPlaceOrder";
import type { TLoading } from "@customTypes/shared";

interface IOrdersState {
    loading: TLoading;
    error: string | null;
}

const initialState: IOrdersState = {
    loading: "idle",
    error: null,
};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        resetOrderStatus: (state) => {
            state.loading = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(actPlaceOrder.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(actPlaceOrder.fulfilled, (state) => {
                state.loading = "succeeded";
            })
            .addCase(actPlaceOrder.rejected, (state, action) => {
                state.loading = "failed";
                state.error =
                    (action.payload as string) || "Failed to place order";
            });
    },
});

export const { resetOrderStatus } = ordersSlice.actions;
export { actPlaceOrder };
export default ordersSlice.reducer;
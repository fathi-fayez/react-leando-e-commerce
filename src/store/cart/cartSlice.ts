import { createSlice } from "@reduxjs/toolkit";
// import actGetProductsByCategory from "./act/actGetProducts";
import actGetCartItems from "./act/actGetCartItems";
import type { TProduct } from "@customTypes/product";
import type { TLoading } from "@customTypes/shared";
import {
    getCartTotalQuantitySelector,
} from "./selectors";
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

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const id = action.payload;

            const item = state.items.find((i) => i.id === id);
            if (item) {
                item.quantity += 1;
            } else {
                state.items.push({ id: id, quantity: 1 });
            }
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter((i) => i.id !== action.payload);
        },
        // productsCleanUp: (state) => {
        //     state.products = [];

        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(actGetCartItems.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(actGetCartItems.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.products = action.payload;
            })
            .addCase(actGetCartItems.rejected, (state, action) => {
                state.loading = "failed";
                state.error =
                    (action.payload as string) || "Failed to fetch cart products";
            });
    },
});

export { getCartTotalQuantitySelector }
export const { addToCart } = cartSlice.actions;
export { actGetCartItems };
export default cartSlice.reducer;
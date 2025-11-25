import { createSlice } from "@reduxjs/toolkit";
import actGetCartItems from "./act/actGetCartItems";
import type { TCartProduct } from "@customTypes/product";
import type { TLoading } from "@customTypes/shared";
import {
    getCartTotalQuantitySelector,
} from "./selectors";
interface ICartState {
    products: TCartProduct[];
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
            state.products = state.products.filter((p) => p.id !== action.payload);
        },

        increaseQuantity: (state, action) => {
            const id = action.payload;
            const item = state.items.find((i) => i.id === id);
            const product = state.products.find((p) => p.id === id);
            if (item) {
                item.quantity += 1;
            }
            if (product) {
                product.quantity += 1;
                product.total = product.price * product.quantity;
            }
        },

        decreaseQuantity: (state, action) => {
            const id = action.payload;
            const item = state.items.find((i) => i.id === id);
            const product = state.products.find((p) => p.id === id);

            if (item && item.quantity > 1) {
                item.quantity -= 1;
                if (product) {
                    product.quantity -= 1;
                    product.total = product.price * product.quantity;
                }
            } else {
                // Remove item if quantity would be 0
                state.items = state.items.filter((i) => i.id !== id);
                state.products = state.products.filter((p) => p.id !== id);
            }
        },

        clearCart: (state) => {
            state.products = [];
            state.items = [];
        },
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
export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export { actGetCartItems };
export default cartSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
// import actGetProductsByCategory from "./act/actGetProducts";
import type { TProduct } from "@customTypes/product";
import {
    getCartTotalQuantitySelector,
} from "./selectors";
interface ICartState {
    products: TProduct[];
    items: { id: number; quantity: number }[];
}

const initialState: ICartState = {
    products: [],
    items: [],
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
        // productsCleanUp: (state) => {
        //     state.products = [];

        // },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(actGetProductsByCategory.pending, (state) => {
    //         state.loading = "pending";
    //         state.error = null;
    //     });
    //     builder.addCase(actGetProductsByCategory.fulfilled, (state, action) => {
    //         console.log('from store', action);

    //         state.loading = "succeeded";
    //         state.products = action.payload.products;
    //     });
    //     builder.addCase(actGetProductsByCategory.rejected, (state, action) => {
    //         state.loading = "failed";
    //         if (action.payload && typeof action.payload === "string") {
    //             state.error = action.payload;
    //         }
    //     });
    // },
});

export { getCartTotalQuantitySelector }
export const { addToCart } = cartSlice.actions;
// export { actGetProductsByCategory };
export default cartSlice.reducer;
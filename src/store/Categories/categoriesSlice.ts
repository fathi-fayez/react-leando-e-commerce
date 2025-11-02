import { createSlice } from '@reduxjs/toolkit'
import actGetCategories from "./act/actGetCategories";

const initialState = {
    categories: [],
    error: null,
    loading: 'idle'
}

export const categoriesSlice = createSlice({
    name: 'categoriesSlice',
    initialState,
    reducers: {
        increment: (state) => {
        },
        decrement: (state) => {
        },
        incrementByAmount: (state, action) => {
        },
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
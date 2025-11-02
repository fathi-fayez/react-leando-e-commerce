import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    records: [],
    error: null,
    loading: 'idle'
}

export const productsSlice = createSlice({
    name: 'ProductsSlice',
    initialState,
    reducers: {
        increment: (state) => {
        },
        decrement: (state) => {
        },
        incrementByAmount: (state, action) => {
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = productsSlice.actions

export default productsSlice.reducer
import { configureStore } from '@reduxjs/toolkit'
import ProductsSlice from '@store/Products/productsSlice'
import CategoriesSlice from '@store/Categories/categoriesSlice'


const store = configureStore({
    reducer: {
        products: ProductsSlice,
        categories: CategoriesSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
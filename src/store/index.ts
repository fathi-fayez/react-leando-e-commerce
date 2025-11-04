import { configureStore, combineReducers } from '@reduxjs/toolkit'
import CategoriesSlice from '@store/Categories/categoriesSlice'
import ProductsSlice from '@store/Products/productsSlice'
import cartSlice from '@store/cart/cartSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['cart'],
}

const rootReducer = combineReducers({
    products: ProductsSlice,
    categories: CategoriesSlice,
    cart: cartSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    devTools: import.meta.env.MODE !== 'production',
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export له{ store, persistor }
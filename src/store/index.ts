import { configureStore, combineReducers } from '@reduxjs/toolkit'
import CategoriesSlice from '@store/categories/categoriesSlice'
import ProductsSlice from '@store/products/productsSlice'
import cartSlice from '@store/cart/cartSlice'
import ordersSlice from '@store/orders/ordersSlice'
import authSlice from '@store/auth/authSlice'
import {
    persistStore, persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const cartPersistConfig = {
    key: 'cart',
    storage,
    whiteList: ['items'],
}

const authPersistConfig = {
    key: "auth",
    storage,
    whiteList: ["user", "accessToken"],
};

const rootReducer = combineReducers({
    products: ProductsSlice,
    categories: CategoriesSlice,
    cart: persistReducer(cartPersistConfig, cartSlice),
    orders: ordersSlice,
    user: authSlice,
    auth: persistReducer(authPersistConfig, authSlice),
})


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store, persistor }
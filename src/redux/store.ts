import { configureStore } from '@reduxjs/toolkit'
import filter from './filter/filterSlice';
import cart from './filter/cartSlice';
import pizza from './filter/pizzaSlice';

export const store = configureStore({
    reducer: {
        filter,
        cart,
        pizza,
    },
})

export type RootState = ReturnType<typeof store.getState>;
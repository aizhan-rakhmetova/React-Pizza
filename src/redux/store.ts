import { configureStore } from '@reduxjs/toolkit'
import filter from './filter/filterSlice.ts';
import cart from './filter/cartSlice.ts';
import pizza from './filter/pizzaSlice.ts';
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        filter,
        cart,
        pizza,
    },
})

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
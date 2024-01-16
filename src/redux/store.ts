import { configureStore } from '@reduxjs/toolkit'
// @ts-ignore
import filter, {FilterStateSlice} from './filter/filterSlice.ts';
// @ts-ignore
import cart, {CartSliceState} from './filter/cartSlice.ts';
// @ts-ignore
import pizza, {PizzaSliceState} from './filter/pizzaSlice.ts';
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        filter,
        cart,
        pizza,
    }
})

// export type RootState = ReturnType<typeof store.getState>;

export type RootState = {
    filter: FilterStateSlice;
    cart: CartSliceState;
    pizza: PizzaSliceState;
};

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
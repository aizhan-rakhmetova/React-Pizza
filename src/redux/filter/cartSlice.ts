import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
// @ts-ignore
import {getCartFromLS} from "../../utils/getCartFromLS.ts";
// @ts-ignore
import {calcTotalPrice} from "../../utils/calcTotalPrice.ts";

export type CartItemsType = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
}

interface CartSliceState {
    totalPrice: number;
    items: CartItemsType[];
}

const {items, totalPrice} = getCartFromLS();

const initialState: CartSliceState = {
    items, totalPrice
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItemsType>) => {
            const findItem = state.items.find((obj) => obj.id === action.payload.id)

            if(findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }

            state.totalPrice = calcTotalPrice(state.items);
        },
        removeItem: (state, action: PayloadAction<string>) => {
            // state.items.filter( (obj) => obj.id !== action.payload);
            const findItem = state.items.find((obj) =>
                obj.id === action.payload)

            if(findItem) {
                findItem.count--;
            }
        },
        removeTotalItem: (state, action: PayloadAction<string>) => {
            state.items.filter( (obj) => obj.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
})

export const selectCart = (state: RootState) => state.cart;

// Action creators are generated for each case reducer function
export const { addItem, removeItem,
    clearCart, removeTotalItem } =
    cartSlice.actions

export default cartSlice.reducer
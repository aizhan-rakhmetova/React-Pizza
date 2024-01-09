import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";

export type CartItemsType = {
    id: string;
    title?: string;
    price?: number;
    imageUrl?: string;
    type?: string;
    size?: number;
    count?: number;
}

interface CartSliceState {
    totalPrice: number;
    items: CartItemsType[];
}

const initialState: CartSliceState = {
    totalPrice: 0,
    items: [],
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

            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            }, 0)
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
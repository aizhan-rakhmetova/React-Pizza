import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    totalPrice: 0,
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
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
        removeItem: (state, action) => {
            // state.items.filter( (obj) => obj.id !== action.payload);
            const findItem = state.items.find((obj) => obj.id === action.payload.id)

            if(findItem) {
                findItem.count--;
            }
        },
        removeTotalItem: (state, action) => {
            state.items.filter( (obj) => obj.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
})

export const selectCart = (state) => state.cart;

// Action creators are generated for each case reducer function
export const { addItem, removeItem,
    clearCart, removeTotalItem } =
    cartSlice.actions

export default cartSlice.reducer
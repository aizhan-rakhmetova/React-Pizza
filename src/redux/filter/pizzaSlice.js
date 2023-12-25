import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";

export const fetchPizzaItems = createAsyncThunk(
    'pizza/fetchPizzaById', async (params) => {
        const { sortBy, order, category, search, currentPage } = params;
        const { data } = await axios
            .get(
                `https://653777febb226bb85dd34805.mockapi.io/items?&page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
            );
        return data;
    }
)

const initialState = {
    items: [],
    status: 'loading',
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(fetchPizzaItems.pending, (state) => {
            state.status = 'loading';
            state.items = [];
        })

        builder.addCase(fetchPizzaItems.rejected, (state) => {
            state.status = 'error';
            state.items = [];
        })

        builder.addCase(fetchPizzaItems.fulfilled, (state, action) => {
            state.status = 'success';
            state.items = action.payload;

        })
    }
})

export const selectPizzaData = (id) =>
    (state) => state.cart.items.find( (obj) => obj.id === id)

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
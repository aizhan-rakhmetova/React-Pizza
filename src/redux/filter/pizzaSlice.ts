import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from "axios";
import {RootState} from "../store";


// export const fetchPizzaItems = createAsyncThunk(
//     'pizza/fetchPizzaById', async (params: Record<string, string>) => {
//         const { sortBy, order, category, search, currentPage } = params;
//         const { data } = await axios
//             .get(
//                 `https://653777febb226bb85dd34805.mockapi.io/items?&page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
//             );
//         return data as CartItemsType[];
//     }

export type PizzaItem = {
    id: string;
    imageUrl: string;
    title: string;
    type: string;
    count: number;
    price: number;
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}
export interface PizzaSliceState {
    items: PizzaItem[];
    status: Status;
}
const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
}

export type SearchPizzaParams = {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    currentPage: string;
}

export const fetchPizzaItems =
    createAsyncThunk<PizzaItem[], SearchPizzaParams >(
        'pizza/fetchPizzaById', async (params) => {
            const { sortBy, order, category, search, currentPage } = params;
            const { data } = await axios
                .get<PizzaItem[]>(
                    `https://653777febb226bb85dd34805.mockapi.io/items?&page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
                );
            return data;
        }
    )
export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<PizzaItem[]>) {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(fetchPizzaItems.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
        })

        builder.addCase(fetchPizzaItems.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
        })

        builder.addCase(fetchPizzaItems.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.items = action.payload;

        })
    }
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
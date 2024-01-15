import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";

export enum SortPropertyEnum {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    TITLE_DESC = 'title',
    TITLE_ASC = '-title',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',

}
export type SortType = {
    name: string;
    sortProperty: SortPropertyEnum,
}
export interface FilterStateSlice  {
    searchValue: string;
    categoryId: number;
    currentPage: number;
    sortType: SortType;
}

const initialState: FilterStateSlice = {
    categoryId: 0,
    currentPage: 1,
    searchValue: '',
    sortType: {
        name: 'популярности',
        sortProperty: SortPropertyEnum.RATING_DESC,
    },
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload;
        },
        setSortType: (state, action: PayloadAction<SortType>) => {
            state.sortType = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setFilters: (state, action: PayloadAction<FilterStateSlice>) => {
            state.currentPage = Number(action.payload.currentPage);
            state.categoryId = Number(action.payload.categoryId);
            // state.sortType = action.payload.sortObj;
            state.sortType = action.payload.sortType;
        },

    },
})

export const selectSort = (state: RootState) => state.filter.sortType;

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortType,
    setCurrentPage, setFilters } =
    filterSlice.actions

export default filterSlice.reducer
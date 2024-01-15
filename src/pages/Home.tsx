import * as React from "react";
import Categories from "../components/Categories.tsx";
import Sort, {sortList} from "../components/Sort.tsx";
import {Skeleton} from "../components/PizzaBlock/Skeleton.tsx";


import {SearchContext} from "../App.tsx";
import { useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom';
import {FilterStateSlice, setCategoryId, setCurrentPage, setFilters, SortType} from "../redux/filter/filterSlice.ts";
import qs from "qs";
import {fetchPizzaItems, SearchPizzaParams} from "../redux/filter/pizzaSlice.ts";
import PizzaBlock from "../components/PizzaBlock/index.tsx";
import {RootState, useAppDispatch} from "../redux/store.ts";
import {Pagination} from "../components/Pagination/index.tsx";


export const Home = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);
    const { categoryId, sortType, currentPage }  = useSelector((state: RootState) => state.filter);
    const { items, status }  = useSelector((state: RootState) => state.pizza);
    const sortProperty = sortType.sortProperty;

    //Если был первый рендер и если изменили паратметры
    React.useEffect( () => {
        if(isMounted.current){
            const queryString = qs.stringify({
                categoryId,
                sort: sortType.sortProperty,
                currentPage,
            })
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sortType.sortProperty, currentPage])

    // Если был первый рендер, то проверяем url-параметры и сохраняем в редаксе
    React.useEffect( () => {
        if(window.location.search) {
            const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

            const sortObj = sortList.find( obj =>
                obj.sortProperty === params.sortBy)

                dispatch(setFilters({
                    searchValue: params.search,
                    categoryId: Number(params.category),
                    currentPage: Number(params.currentPage),
                    sortType: sortObj ||  sortList[0]
                }))

            isSearch.current = true;
        }
    }, [])


    const onChangeCategory = React.useCallback( (id: number) => {
        dispatch(setCategoryId(id));
    }, []);

    const { searchValue } = React.useContext<any>(SearchContext);

    const fetchPizzas = async() => {

        const sortBy = sortProperty.replace('-', '');
        const order = sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        //Double check types here
        dispatch(fetchPizzaItems({
                    sortBy, order, category, search, currentPage: String(currentPage),
                }))

        // try {
        //
        //     // dispatch(setItems(data));
        // } catch(error) {
        //     console.log('error', error)
        // } finally {
        //     setIsLoading(false);
        // }
    }


    // Если был первый рендер, то запрашиваем пиццы
    React.useEffect( () => {
        window.scrollTo( 0, 0);

        if(!isSearch.current) {
            // dispatch(fetchPizzas({} as SearchPizzaParams));
            fetchPizzas();
        }
        isSearch.current = false;
    }, [categoryId, sortProperty, searchValue, currentPage])

    // Filtration and Sort without axios end

    const onChangePage = (number: number) => {
          dispatch(setCurrentPage(number));
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories value ={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    status === 'loading'
                        ? [...new Array(6)].map( (_, index) => <Skeleton key = {index} />)
                        :  items.map( (obj)=>
                                <PizzaBlock {...obj} key = {obj.id}/>
                        )
                }
            </div>
            <Pagination onChangePage={onChangePage} />
        </div>
    )
}

import React from "react";

import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import {Pagination} from "../components/Pagination";
import {SearchContext} from "../App";
import { useSelector, useDispatch } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom';
import {setCategoryId, setCurrentPage, setFilters} from "../redux/filter/filterSlice";
import qs from "qs";
import {fetchPizzaItems} from "../redux/filter/pizzaSlice";


export const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);
    const { categoryId, sortType, currentPage }  = useSelector((state) => state.filter);
    const { items, status }  = useSelector((state) => state.pizza);
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
            const params = qs.parse(window.location.search.substring(1));

            const sortObj = sortList.find( obj =>
                obj.sortProperty === params.sort)

            dispatch(setFilters({
                ...params, sortObj
            }))
            isSearch.current = true;
        }
    }, [])


    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    }

    const { searchValue } = React.useContext(SearchContext);

    const fetchPizzas = async() => {

        const sortBy = sortProperty.replace('-', '');
        const order = sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(fetchPizzaItems({
                    sortBy, order, category, search, currentPage
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
            fetchPizzas();
        }
        isSearch.current = false;
    }, [categoryId, sortProperty, searchValue, currentPage])

    // Filtration and Sort without axios end

    const onChangePage = (number) => {
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
                            <Link key = {obj.id} to={`/pizza/${obj.id}`}>
                                <PizzaBlock {...obj} />
                            </Link>
                        )
                }
            </div>
            <Pagination onChangePage={onChangePage} />
        </div>
    )
}

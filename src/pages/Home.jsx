import React from "react";

import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import {Pagination} from "../components/Pagination";
import {SearchContext} from "../App";
import { useSelector, useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom';
import {setCategoryId, setCurrentPage, setFilter} from "../redux/filter/filterSlice";
import axios from "axios";
import qs from "qs";

export const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { categoryId, sortType, currentPage }  = useSelector((state) => state.filter);
    const sortProperty = sortType.sortProperty;

    React.useEffect( () => {
        if(window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sortObj = sortList.find( obj =>
                obj.sortProperty === params.sort)

            dispatch(setFilter({
                ...params, sortObj
            }))

        }
    }, [])


    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    }

    const { searchValue } = React.useContext(SearchContext);
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const fetchPizzas = () => {
        setIsLoading(true);

        const sortBy = sortProperty.replace('-', '');
        const order = sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        axios
            .get(
                `https://653777febb226bb85dd34805.mockapi.io/items?&page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
            ).then( (response) => {
            setItems(response.data);
            setIsLoading(false);
        })
    }

    React.useEffect( () => {
        const queryString = qs.stringify({
            categoryId,
            sort: sortType.sortProperty,
            currentPage,
        })
        navigate(`?${queryString}`);
        // console.log(queryString)
    }, [categoryId, sortType.sortProperty, currentPage])

    React.useEffect( () => {
        fetchPizzas();

        window.scrollTo( 0, 0);
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
                    isLoading
                        ? [...new Array(6)].map( (_, index) => <Skeleton key = {index} />)
                        :  items.map( (obj)=> <PizzaBlock key = {obj.id} {...obj} />)
                }
            </div>
            <Pagination onChangePage={onChangePage} />
        </div>
    )
}

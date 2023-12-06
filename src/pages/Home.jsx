import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

export const Home = ({searchValue}) => {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    // Filtration and Sort without axios start
    const [categoryId, setCategoryId] = React.useState(0);
    const [sortType, setSortType] = React.useState({
        name: 'популярности',
        sortProperty: 'rating',
    });

    React.useEffect( () => {
        setIsLoading(true);

        const sortBy = sortType.sortProperty.replace('-', '');
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        fetch(`https://653777febb226bb85dd34805.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search})`)
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
                setIsLoading(false);
            })
        window.scrollTo( 0, 0);
    }, [categoryId, sortType, searchValue])

    // Filtration and Sort without axios end

    return (
        <div className="container">
            <div className="content__top">
                <Categories value ={categoryId} onChangeCategory={(id) => setCategoryId(id)}/>
                <Sort value ={sortType} onChangeSort={(sortTypeProperty) => setSortType(sortTypeProperty)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [...new Array(6)].map( (_, index) => <Skeleton key = {index} />)
                        :  items.map( (obj)=> <PizzaBlock key = {obj.id} {...obj} />)
                }
            </div>
        </div>
    )
}

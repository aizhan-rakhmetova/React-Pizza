import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import * as React from 'react';

export const FullPizza: () => "Загрузка..." | React.JSX.Element = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [pizza, setPizza] = useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();

   useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get('https://626d16545267c14d5677d9c2.mockapi.io/items/' + id);
                setPizza(data);
            } catch (error) {
                alert('Ошибка при получении пиццы!');
                navigate('/');
            }
        }

        fetchPizza();
    }, []);

    if (!pizza) {
        return 'Загрузка...';
    }

    return (
        <div className="container">
            <img src={pizza.imageUrl}  alt="pizza"/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} ₽</h4>
            <Link to="/">
                <button className="button button--outline button--add">
                    <span>Назад</span>
                </button>
            </Link>
        </div>
    );
};

export default FullPizza;
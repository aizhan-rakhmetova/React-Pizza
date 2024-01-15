import {FC, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addItem, CartItemsType} from '../../redux/filter/cartSlice.ts';
import {selectPizzaData} from '../../redux/filter/pizzaSlice.ts';
import {Link} from "react-router-dom";
import * as React from "react";

type PizzaBlockProps = {
  id: string;
  title?: string;
  price?: number;
  imageUrl?: string;
  sizes?: number[];
  types?: number[];
}

const PizzaBlock: FC<PizzaBlockProps> = ({id, title, price,
                                           imageUrl, sizes, types}) => {

  const typeNames= ['тонкое', 'традиционное'];

  const [activeType, setActiveType] = useState<number>(0);
  const [activeSize, setActiveSize] = useState<number>(0);

  const dispatch = useDispatch()

  const cartItem = useSelector(selectPizzaData(id))

  const addedCount = cartItem ? cartItem.count : 0;

  const clickHandler = () => {
    const items: CartItemsType =  {
      id,
      title,
      price,
      imageUrl,
      size: activeSize,
      type: typeNames[activeType],
    }
    dispatch(addItem(items));
  }

  return (
    <div className="pizza-block-wrapper">
      <div className="content__items">
        <div className="pizza-block">
          <Link to={`/pizza/${id}`}>
            <img
                className="pizza-block__image"
                src={imageUrl}
                alt="Pizza"
            />
          </Link>

          <h4 className="pizza-block__title">{title}</h4>
          <div className="pizza-block__selector">
            <ul>
              {
                types.map( (typeId) =>
                    <li key = {typeId} onClick = {() => setActiveType(typeId)}
                        className = {activeType === typeId ? 'active' : ''}>
                      {typeNames[typeId]}
                    </li>
                )}

            </ul>
            <ul>
              {sizes.map( (size, i) =>
                  <li key = {size} onClick = {() => setActiveSize(i)}
                      className = {activeSize === i ? 'active' : ''}>
                    {size} см.
                  </li>
              )}
            </ul>
          </div>
          <div className="pizza-block__bottom">
            <div className="pizza-block__price">{price}</div>
            <button onClick={clickHandler} className="button button--outline button--add">
              <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                    fill="white"
                />
              </svg>
              <span>Добавить</span>
              <i>{addedCount}</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;

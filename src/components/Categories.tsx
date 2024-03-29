import * as React from "react";
// import { useWhyDidYouUpdate } from 'ahooks';

type CategoryProps = {
    value: number;
    onChangeCategory: (index: number) => void;
}
const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', ' Острые', 'Закрытые']

export const Categories: React.FC<CategoryProps> =  React.memo(({value, onChangeCategory }) => {
    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, index) => (
                    <li key = {index}
                        onClick={() => onChangeCategory(index)}
                        className={value === index ? 'active' : null}>
                        {categoryName}
                    </li>
                ))}
            </ul>
        </div>
    );
})



import {FC} from "react";

type CategoryProps = {
    value: number;
    onChangeCategory: (index: number) => void;
}
const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', ' Острые', 'Закрытые']
const Categories: FC<CategoryProps> = ({value, onChangeCategory }) => {
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
}

export default Categories;

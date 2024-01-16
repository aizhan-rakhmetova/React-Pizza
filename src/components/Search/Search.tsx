// @ts-ignore
import * as debounce from 'lodash.debounce';
// @ts-ignore
import styles from './Search.module.scss';
// @ts-ignore
import SearchIcon from '../../assets/img/search-icon.svg';
// @ts-ignore
import DeleteIcon from '../../assets/img/delete-icon.svg'
// @ts-ignore
import { SearchContext } from "../../App.tsx";
import {FC, useCallback, useContext, useRef, useState} from "react";

export const Search: FC = () => {
    const [value, setValue] = useState('');
    const { setSearchValue }: any = useContext(SearchContext);

    const inputRef = useRef<HTMLInputElement>(null);

    const onClickClear = () => {
        setSearchValue('');
        setValue('');
        inputRef.current?.focus();
    }

   const updateInputValue = useCallback(
       debounce( (string) => {
           setSearchValue(string);
       }, 1000),
       [],
   );


    const InputChangeHandle = (event) => {
        setValue(event.target.value);
        updateInputValue(event.target.value);
    }

    return (
        <div className={styles.root}>
            <img className={styles.icon} src={SearchIcon} alt="SearchIcon" />
            <input
                ref={inputRef}
                value={value}
                placeholder="Поиск пиццы..."
                className={styles.input}
                onChange = {InputChangeHandle}
            />
            { value &&
                <img onClick = {onClickClear} className={styles.deleteIcon} src={DeleteIcon} alt="DeleteIcon" /> }
        </div>
    );
}



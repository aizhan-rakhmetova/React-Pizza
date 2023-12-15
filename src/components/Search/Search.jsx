import React from 'react';

import styles from './Search.module.scss';
import SearchIcon from '../../assets/img/search-icon.svg';
import DeleteIcon from '../../assets/img/delete-icon.svg'
import { SearchContext } from "../../App";
import debounce from 'lodash.debounce';

function Search() {
    const [value, setValue] = React.useState('');
    const { setSearchValue } = React.useContext(SearchContext);
    const inputRef = React.useRef();

    const onClickClear = () => {
        setSearchValue('');
        setValue('');
        inputRef.current.focus();
    }

   const updateInputValue = React.useCallback(
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

export default Search;

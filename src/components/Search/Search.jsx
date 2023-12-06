import React from 'react';

import styles from './Search.module.scss';
import SearchIcon from '../../assets/img/search-icon.svg';
import DeleteIcon from '../../assets/img/delete-icon.svg'

function Search({searchValue, setSearchValue}) {
    return (
        <div className={styles.root}>
            <img className={styles.icon} src={SearchIcon} alt="SearchIcon" />
            <input
                value={searchValue}
                placeholder="Поиск пиццы..."
                className={styles.input}
                onChange = {(event) => setSearchValue(event.target.value)}
            />
            { searchValue &&
                <img onClick = {() => setSearchValue('')} className={styles.deleteIcon} src={DeleteIcon} alt="DeleteIcon" /> }
        </div>
    );
}

export default Search;

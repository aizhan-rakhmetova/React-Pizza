import React from "react";
import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock = () => {
    return (
        <h1 className={ styles.root }>
            <span> 🙃 </span>
            <br />
            Ничего не  найдено
            <div className={ styles.description }> К сожалению данная страница отсутсвует в нашем интернет-магазине  </div>
        </h1>
    )
}

// @ts-ignore
import styles from './NotFoundBlock.module.scss';
import {FC} from "react";

export const NotFoundBlock: FC = () => {
    return (
        <h1 className={ styles.root }>
            <span> 🙃 </span>
            <br />
            Ничего не  найдено
            <div className={ styles.description }> К сожалению данная страница отсутсвует в нашем интернет-магазине  </div>
        </h1>
    )
}

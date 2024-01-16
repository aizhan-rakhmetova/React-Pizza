import ReactPaginate from 'react-paginate';
// @ts-ignore
import styles from './Pagination.module.scss';
import {FC} from "react";

type PaginationProps = {
    onChangePage: (value: number) => void;
}
export const Pagination: FC<PaginationProps> = ({ onChangePage }) => {
    return <ReactPaginate
        className = {styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={event => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
    />

}

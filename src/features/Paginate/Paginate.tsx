import React from "react";
import ReactPaginate from "react-paginate";

type PaginatePropsType = {
    totalUsersCount: number
    pageSize: number
    onChangeHandler: (p: number) => void
}

export const Paginate:React.FC<PaginatePropsType> = ({totalUsersCount, pageSize, onChangeHandler}) => {
    return (
        <div>
            <ReactPaginate pageCount={Math.ceil(totalUsersCount / pageSize)} pageRangeDisplayed={8}
                           marginPagesDisplayed={2}
                           onPageChange={(p) => onChangeHandler(p.selected)}
                           disableInitialCallback={true}
            />
        </div>
    )
}
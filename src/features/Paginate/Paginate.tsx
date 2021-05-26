import React from "react";
import ReactPaginate from "react-paginate";
import {Button} from '@material-ui/core'

type PaginatePropsType = {
    totalUsersCount: number
    pageSize: number
    onChangeHandler: (p: number) => void
}

export const Paginate:React.FC<PaginatePropsType> = ({totalUsersCount, pageSize, onChangeHandler}) => {
    return (
        <>
            <ReactPaginate containerClassName={'paginationContainer'} pageCount={Math.ceil(totalUsersCount / pageSize)} pageRangeDisplayed={8}
                           marginPagesDisplayed={2}
                           onPageChange={(p) => onChangeHandler(p.selected)}
                           disableInitialCallback={true}
                           previousLabel={<Button variant="outlined" color="primary">Previous</Button>}
                           nextLabel={<Button variant="outlined" color="primary">Next</Button>}
                           activeLinkClassName={'paginationActiveLink'}
            />
        </>
    )
}
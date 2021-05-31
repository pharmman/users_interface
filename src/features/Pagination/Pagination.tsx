import React, {useState} from 'react'
import {Button} from '@material-ui/core'
import style from './Pagination.module.css'

type PaginatePropsType = {
    totalItemsCount: number
    pageSize?: number
    currentPage?: number
    onPageChanged?: (pageNumber: number) => void
    portionSize?: number
}

export const Pagination: React.FC<PaginatePropsType> = React.memo(({
                                                                       totalItemsCount, pageSize = 50,
                                                                       onPageChanged = (x: any) => x,
                                                                       portionSize = 10,
                                                                       currentPage
                                                                   }) => {

    const pagesCount = Math.ceil(totalItemsCount / pageSize)

    const pages: Array<number> = []
    for (let i = 0; i < pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)

    const leftPortionPageNumber = (portionNumber - 1) * portionSize
    const rightPortionPageNumber = portionNumber * portionSize - 1

    const onNextButtonHandler = () => {
        setPortionNumber(portionNumber + 1)
        onPageChanged(leftPortionPageNumber + 10)
    }

    const onPrevButtonHandler = () => {
        setPortionNumber(portionNumber - 1)
        onPageChanged(rightPortionPageNumber - 10)
    }
    return <ul className={style.wrapper}>
        <li><Button disabled={portionNumber === 1} onClick={onPrevButtonHandler} variant={'contained'}>Back</Button>
        </li>
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
                return <li
                    key={p}
                    onClick={() => {
                        onPageChanged(p)
                    }}><Button variant={'contained'} color={p === currentPage ? 'primary' : 'default'}>{p + 1}</Button>
                </li>
            })}
        <li><Button disabled={portionCount <= portionNumber} onClick={onNextButtonHandler}
                    variant={'contained'}>Next</Button></li>
    </ul>
})
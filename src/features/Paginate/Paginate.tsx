import React, {useState} from 'react'

type PaginatePropsType = {
    totalItemsCount: number
    pageSize?: number
    currentPage?: number
    onPageChanged?: (pageNumber: number) => void
    portionSize?: number
}

export const Paginate: React.FC<PaginatePropsType> = ({
                                                          totalItemsCount, pageSize = 50,
                                                          onPageChanged = x => x,
                                                          portionSize = 5
                                                      }) => {

    const pagesCount = Math.ceil(totalItemsCount / pageSize)

    const pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)

    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    const onNextButtonHandler = () => {
        setPortionNumber(portionNumber + 1)
        onPageChanged(leftPortionPageNumber)
    }

    const onPrevButtonHandler = () => {
        setPortionNumber(portionNumber - 1)
        onPageChanged(rightPortionPageNumber)
    }


    return <div>
        {portionNumber > 1 &&
        <button onClick={onPrevButtonHandler}>PREV</button>}
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
                return <span
                    key={p}
                    onClick={(e) => {
                        onPageChanged(p)
                    }}>{p}</span>
            })}
        {portionCount > portionNumber &&
        <button onClick={onNextButtonHandler}>NEXT</button>}


    </div>
}
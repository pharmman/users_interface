import React, {useCallback, useMemo, useState} from 'react'
import {Pagination} from '../Pagination/Pagination'
import {Filtering} from './Filtering/Filtering'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../../app/store'
import {UserType} from './users-reducer'
import {useSorting} from '../useSorting'
import {TableContainer} from './Table/TableContainer'
import {CurrentUser} from './CurrentUser/CurrentUser'
import {Preloader} from '../Preloader/Preloader'

export const Users: React.FC = () => {
    const data = useSelector<AppRootStateType, UserType[]>(state => state.users)

    //sorting data for table
    let {sortedData, sorting, sortingField} = useSorting(data)

    //filtering
    const [inputValue, setInputValue] = useState<string>('')
    const [isDataFiltered, setIsDataFiltered] = useState<boolean>(false)
    const setInputValueHandler = useCallback((value: string) => setInputValue(value), [])
    const setDataIsFilteredHandler = useCallback((condition: boolean) => setIsDataFiltered(condition), [])

    const filterByValue = useCallback((array: Array<UserType>, string: string) => {
        return array.filter(o =>
            Object.keys(o).some(k => o[k as keyof UserType].toString().toLowerCase().includes(string.toLowerCase())))
    }, [])

    if (isDataFiltered) {
        sortedData = filterByValue(sortedData, inputValue)
    }

    //pagination
    const [currentPage, setCurrentPage] = useState(0)
    const handleSetCurrentPage = useCallback((page: number) => setCurrentPage(page), [])
    const pageSize = 50
    const offset = currentPage * pageSize
    const pageData = useMemo(() => sortedData.slice(offset, offset + pageSize), [offset, sortedData])

    //showing chosen user
    const [currentUser, setCurrentUser] = useState<UserType | null>(null)
    const setCurrentUserHandler = useCallback((user: UserType) => setCurrentUser(user), [])

    if (data.length === 0) {
        return <Preloader/>
    }


    return (
        <>
            <Filtering inputValue={inputValue} setInputValueHandler={setInputValueHandler}
                       setDataIsFilteredHandler={setDataIsFilteredHandler}/>
            <TableContainer data={pageData} setCurrentUserHandler={setCurrentUserHandler} setSortingField={sorting}
                            sortingField={sortingField}/>
            <Pagination totalItemsCount={sortedData.length} onPageChanged={handleSetCurrentPage} pageSize={pageSize}
                        currentPage={currentPage}/>
            {currentUser && <CurrentUser user={currentUser}/>}
        </>
    )
}
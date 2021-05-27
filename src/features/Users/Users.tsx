import React, {useEffect, useState} from 'react'
import {Paginate} from '../Paginate/Paginate'
import {Filtering} from './Filtering/Filtering'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../app/store'
import {getUsers, UserType} from './users-reducer'
import {useSorting} from '../useSorting'
import {MainPage} from './MainPage/MainPage'


export type TitlesType = keyof Omit<UserType, 'address'>

export type SortConfigType = {
    key: keyof UserType | null
    direction: string
}

type UsersPropsType = {
    tableSize: 'big' | 'small' | null
}

export const Users: React.FC<UsersPropsType> = ({tableSize}) => {
    const dispatch = useDispatch()
    const data = useSelector<AppRootStateType, UserType[]>(state => state.users)
    const appLoading = useSelector<AppRootStateType, boolean>(state => state.application.loading)

    //sorting data for table
    let {sortedData, sorting, sortingField} = useSorting(data)

    //titles for table
    let titles: TitlesType[] =  ['id', 'firstName', 'lastName', 'email', 'phone', 'description']

    //filtering
    const [inputValue, setInputValue] = useState<string>('')
    const [isDataFiltered, setIsDataFiltered] = useState<boolean>(false)

    function filterByValue(array: Array<UserType>, string: string) {
        return array.filter(o =>
            Object.keys(o).some(k => o[k as keyof UserType].toString().toLowerCase().includes(string.toLowerCase())))
    }
    if (isDataFiltered) {
        sortedData = filterByValue(sortedData, inputValue)
    }

    //pagination
    const [currentPage, setCurrentPage] = useState(0)
    const handlePageClick = (page: number) => {
        setCurrentPage(page)
    }
    const pageSize = 5
    const offset = currentPage * pageSize
    const pageData = sortedData.slice(offset, offset + pageSize)

    useEffect(() => {
        dispatch(getUsers(tableSize || 'small'))
    }, [dispatch, tableSize])

    if (appLoading || !data.length) {
        return <h1>ГРУЗИТСЯ</h1>
    }

    return (
        <>
            <Filtering inputValue={inputValue} setInputValue={setInputValue} setIsDataFiltered={setIsDataFiltered}/>
            <MainPage titles={titles} data={pageData} setSortingField={sorting} sortingField={sortingField}/>
            <Paginate totalItemsCount={sortedData.length} onPageChanged={handlePageClick} pageSize={pageSize}/>
        </>
    )
}
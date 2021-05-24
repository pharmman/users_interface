import React, {useEffect, useState} from 'react'
import {Paginate} from "../Paginate/Paginate";
import { Filtering } from "./Filtering/Filtering";
import {Table, UserType} from './Table/Table'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../app/store'
import {getUsers} from './users-reducer'


export type SortConfigType = {
    key: keyof UserType | null
    direction: string
}

type UsersPropsType = {
    tableSize: 'big' | 'small' | null
}

export const Users:React.FC<UsersPropsType> = ({tableSize}) => {
    const dispatch = useDispatch()
    const data = useSelector<AppRootStateType, UserType[]>(state => state.users)
    const appLoading = useSelector<AppRootStateType, boolean>(state => state.application.loading)

    useEffect(() => {
       dispatch(getUsers(tableSize || 'small'))
    }, [dispatch, tableSize])

    useEffect(() => {

    })

    const [inputValue, setInputValue] = useState<string>('')
    const [isDataFiltered, setIsDataFiltered] = useState<boolean>(false)

    const [sortingField, setSortingField] = useState<SortConfigType>({
        key: null,
        direction: "up"
    })

    let sortedData = [...data]

    const sorting = (key: keyof UserType) => {
        let direction = 'up';
        if (sortingField.key === key && sortingField.direction === 'up') {
            direction = 'down';
        }
        setSortingField({key, direction});
    }


    function filterByValue(array: Array<UserType>, string: string) {
        return array.filter(o =>
            Object.keys(o).some(k => o[k as keyof UserType].toString().toLowerCase().includes(string.toLowerCase())));
    }

    if (isDataFiltered) {
        sortedData = filterByValue(sortedData, inputValue)
    }


    const {key} = sortingField
    if (key) {
        sortedData.sort((a, b) => {
                if (a[key] < b[key]) {
                    return sortingField.direction === 'up' ? -1 : 1;
                }
                if (a[sortingField.key as keyof UserType] > b[sortingField.key as keyof UserType]) {
                    return sortingField.direction === 'up' ? 1 : -1;
                }
                return 0;
            }
        )
    }


    const [currentPage, setCurrentPage] = useState(0)

    const handlePageClick = (page: number) => {
        setCurrentPage(page)
    }
    const pageSize = 50
    const offset = currentPage * pageSize

    const pageData = sortedData.slice(offset, offset + pageSize)

    if (appLoading) {
        return <h1>ГРУЗИТСЯ</h1>
    }

    return (
        <>
            <Filtering inputValue={inputValue} setInputValue={setInputValue} setIsDataFiltered={setIsDataFiltered}/>
            <Table data={pageData} setSortingField={sorting} sortingField={sortingField}/>
            <Paginate totalUsersCount={sortedData.length} pageSize={pageSize} onChangeHandler={handlePageClick}/>
        </>
    )
}
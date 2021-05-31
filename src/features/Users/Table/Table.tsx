import React from 'react'
import {UserType} from '../users-reducer'
import {Table as MaterialTable} from '@material-ui/core'
import {TableHead} from './TableHead/TableHead'
import {TableBody} from './TableBody/TableBody'
import {TitlesType} from './TableContainer'
import {SortConfigType} from '../../useSorting'


type TablePropsType = {
    data: UserType[]
    setSortingField: (key: keyof UserType) => void
    sortingField: SortConfigType
    setCurrentUserHandler: (user: UserType) => void
    addUser: boolean
    titles: TitlesType[]
}

export const Table: React.FC<TablePropsType> = React.memo(({
                                                               data,
                                                               setSortingField,
                                                               sortingField,
                                                               setCurrentUserHandler,
                                                               addUser,
                                                               titles
                                                           }) => {

    return (
        <MaterialTable>
            <TableHead titles={titles} sortingField={sortingField} setSortingField={setSortingField}/>
            <TableBody titles={titles} data={data} setCurrentUserHandler={setCurrentUserHandler} addUser={addUser}/>
        </MaterialTable>
    )
})
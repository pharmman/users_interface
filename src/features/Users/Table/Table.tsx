import React, {Dispatch, SetStateAction, useState} from 'react'
import {SortConfigType} from '../Users'
import {CurrentUser} from '../CurrentUser/CurrentUser'
import {UserType} from '../users-reducer'
import {Button, Paper, Table as MaterialTable, TableContainer} from '@material-ui/core'
import {TableHead} from './TableHead/TableHead'
import {TableBody} from './TableBody/TableBody'



type TablePropsType = {
    data: UserType[]
    setSortingField: (key: keyof UserType) => void
    sortingField: SortConfigType
    titles: TitlesType[]
    setCurrentUser: Dispatch<SetStateAction<UserType | null>>
    toggleAddUser: (state: boolean) => void
    addUser: boolean
}

export const Table: React.FC<TablePropsType> = ({
                                                    data,
                                                    setSortingField,
                                                    sortingField,
                                                    titles,
                                                    toggleAddUser,
                                                    setCurrentUser,
                                                    addUser
                                                }) => {
    const getValues = (user: UserType): Array<string | number> => {
        return titles.map(title => typeof user[title] !== 'object' ? user[title] : '')
    }

    return (
        <MaterialTable>
            <TableHead titles={titles} sortingField={sortingField} setSortingField={setSortingField}/>
            <TableBody data={data} getValues={getValues} setCurrentUser={setCurrentUser} addUser={addUser}
                       toggleAddUser={toggleAddUser}/>
        </MaterialTable>
    )
}

// const asd = (props: any) => {
//     <div>
//         <form>
//             <table>
//                 <thead></thead>
//                 <fomitem></fomitem>
//                 {...props.children}
//             </table>
//         </form>
//
//     </div>
// }
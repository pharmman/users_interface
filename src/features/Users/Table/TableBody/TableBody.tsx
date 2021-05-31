import {AddUser} from '../../AddUser/AddUser'
import {TableBody as MaterialTableBody, TableCell, TableRow} from '@material-ui/core'
import React from 'react'
import {UserType} from '../../users-reducer'
import {TitlesType} from '../TableContainer'

type TableBodyPropsType = {
    data: UserType[]
    setCurrentUserHandler: (user: UserType) => void
    addUser: boolean
    titles: TitlesType[]
}

export const TableBody: React.FC<TableBodyPropsType> = React.memo(({
                                                                       setCurrentUserHandler,
                                                                       data,
                                                                       titles,
                                                                       addUser
                                                                   }) => {

    const getValues = (user: UserType): Array<string | number> => {
        return titles.map(title => typeof user[title] !== 'object' ? user[title] : '')
    }

    return (
        <MaterialTableBody>
            {addUser && <AddUser/>}
            {data.map((u, index) => (
                <TableRow onClick={() => setCurrentUserHandler(u)}
                          key={index}>
                    {getValues(u).map((v, index) => (
                        <TableCell align={'center'} key={index}>{v}</TableCell>
                    ))}
                </TableRow>
            ))}
        </MaterialTableBody>
    )
})
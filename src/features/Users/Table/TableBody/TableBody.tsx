import {AddUser} from '../../AddUser/AddUser'
import {TableBody as MaterialTableBody, TableCell, TableRow} from '@material-ui/core'
import React, {Dispatch, SetStateAction} from 'react'
import {UserType} from '../../users-reducer'

type TableBodyPropsType = {
    data: UserType[]
    getValues: (user:UserType) => Array<string | number>
    setCurrentUser: Dispatch<SetStateAction<UserType | null>>
    toggleAddUser: (state:boolean) => void
    addUser: boolean
}

export const TableBody:React.FC<TableBodyPropsType> = ({setCurrentUser, data,getValues, toggleAddUser, addUser}) => {

    const changeCurrentUser = (user: UserType) => {
        setCurrentUser(user)
    }

    return (
        <MaterialTableBody>
            <AddUser toggleAddUser={toggleAddUser}/>
            {data.map((u, index) => (
                <TableRow onClick={() => changeCurrentUser(u)}
                          key={index}>
                    {getValues(u).map((v, index) => (
                        <TableCell key={index}>{v}</TableCell>
                    ))}
                </TableRow>
            ))}
        </MaterialTableBody>

    )
}
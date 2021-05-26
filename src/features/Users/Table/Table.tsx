import React, {useState} from 'react'
import {SortConfigType} from '../Users'
import {CurrentUser} from '../CurrentUser/CurrentUser'
import {UserType} from '../users-reducer'
import {Button, Paper, Table as MaterialTable, TableContainer} from '@material-ui/core'
import {TableHead} from './TableHead/TableHead'
import {TableBody} from './TableBody/TableBody'

export type TitlesType = keyof Omit<UserType, 'address'>

type TablePropsType = {
    data: UserType[]
    setSortingField: (key: keyof UserType) => void
    sortingField: SortConfigType
    titles: TitlesType[]
}

export const Table: React.FC<TablePropsType> = ({data, setSortingField, sortingField, titles}) => {
    const [currentUser, setCurrentUser] = useState<UserType | null>(null)
    const getValues = (user: UserType): Array<string | number> => {
        return titles.map(title => typeof user[title] !== 'object' ? user[title] : '')
    }
    const [addUser, setAddUser] = useState<boolean>(false)
    const toggleAddUser = (state: boolean) => {setAddUser(state)}

    return (
        <div>
            <Button variant={'contained'} color={'primary'} onClick={() => toggleAddUser(true)}>Add User</Button>
                <MaterialTable>
                    <TableHead titles={titles} sortingField={sortingField} setSortingField={setSortingField}/>
                    <TableBody data={data} getValues={getValues} setCurrentUser={setCurrentUser} addUser={addUser} toggleAddUser={toggleAddUser}/>
                </MaterialTable>
            {currentUser && <CurrentUser user={currentUser}/>}
        </div>
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
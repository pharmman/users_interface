import style from './Table.module.css'
import React, {useState} from 'react'
import {SortConfigType} from '../Users'
import {CurrentUser} from '../CurrentUser/CurrentUser'
import {AddUser} from '../AddUser/AddUser'
import {UserType} from '../users-reducer'

export type TitlesType = keyof Omit<UserType, 'address'>

type TablePropsType = {
    data: UserType[]
    setSortingField: (key: keyof UserType) => void
    sortingField: SortConfigType
    titles: TitlesType[]
}

export const Table: React.FC<TablePropsType> = ({data, setSortingField, sortingField, titles}) => {
    const [currentUser, setCurrentUser] = useState<UserType | null>(null)
    const getValues = (user:UserType):Array<string | number> => {
        return titles.map(title => typeof user[title]  !== 'object' ? user[title] : '')
    }
    const [addUser, setAddUser] = useState<boolean>(false)
    const changeCurrentUser = (user: UserType) => {
        setCurrentUser(user)
    }
    const toggleAddUser = (state: boolean) => {
        setAddUser(state)
    }
    return (
        <div>
            <button onClick={() => toggleAddUser(true)}>Add User</button>
            <table className={style.myTable}>
                <thead>
                <tr className={style.row}>
                    {titles.map((t, index) => {
                        return sortingField.key === t ?
                            <th key={index}
                                onClick={() => setSortingField(t as keyof UserType)}>{t} {sortingField.direction === 'up' ? <>▼</> : <>▲</>}</th>
                            :
                            <th key={index} onClick={() => setSortingField(t as keyof UserType)}>{t}</th>
                    })}
                </tr>
                </thead>
                <tbody>
                <AddUser toggleAddUser={toggleAddUser} titles={titles}/>
                {data.map((u, index) => (
                        <tr onClick={() => changeCurrentUser(u)}
                            key={index}>
                            {getValues(u).map((v, index) => (
                                <th key={index}>{v}</th>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
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
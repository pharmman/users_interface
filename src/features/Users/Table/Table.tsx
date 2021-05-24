import style from './Table.module.css'
import React, {useEffect, useState} from 'react'
import {SortConfigType} from "../Users";
import {CurrentUser} from "../CurrentUser/CurrentUser";
import {AddUser} from "../AddUser/AddUser";

export interface UserType  {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
    address: AddressType
    description: string
}

export type AddressType = {
    streetAddress: string
    city: string
    state: string
    zip: string
}

type TablePropsType = {
    data: UserType[]
    setSortingField: (key: keyof UserType) => void
    sortingField: SortConfigType
}

export const Table: React.FC<TablePropsType> = ({data, setSortingField, sortingField}) => {
    // let titles = Object.keys(data[0]).filter(t => t !== 'address')

    const titles = ['dsasda','dsasdasda']

    const [currentUser, setCurrentUser] = useState<UserType | null>(null)
    const [hovered, setHovered] = useState<boolean>(false)


    const changeCurrentUser = (user: UserType) => {
        setCurrentUser(user)
    }

    const onMouseEnter = () => {
        setHovered(true)
    }

    const onMouseLeave = () => {
        setHovered(false)
    }

    return (
        <div>
            <table className={style.myTable}>
                <thead>
                <tr className={style.row}>
                    {titles.map((t, index) => {
                        return sortingField.key === t ?
                            <th key={index} onClick={() => setSortingField(t as keyof UserType)}>{t} {sortingField.direction === 'up' ? <>▼</> : <>▲</>}</th>
                            :
                            <th key={index} onClick={() => setSortingField(t as keyof UserType)}>{t}</th>
                    })}
                </tr>
                </thead>
                <tbody>
                <AddUser titles={titles}/>
                {data.map((u, index) => (
                        <tr onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={() => changeCurrentUser(u)}
                            key={index}>
                            {Object.values(u).filter(q => typeof q !== 'object').map((v, index) => (hovered
                                    ?
                                    <th key={index}>{v}</th>
                                    :
                                    <th key={index}>{v}</th>
                            ))}
                        </tr>
                    )
                )}
                </tbody>
            </table>
            {currentUser && <CurrentUser user={currentUser}/>}
        </div>
    )
}


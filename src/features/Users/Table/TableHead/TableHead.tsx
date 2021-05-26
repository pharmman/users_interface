import {TableCell, TableRow, TableHead as MaterialTableHead} from '@material-ui/core'
import style from '../Table.module.css'
import {UserType} from '../../users-reducer'
import React from 'react'
import {SortConfigType} from '../../Users'
import {TitlesType} from '../Table'

type TableHeadPropsType = {
    setSortingField: (key: keyof UserType) => void
    sortingField: SortConfigType
    titles: TitlesType[]
}

export const TableHead: React.FC<TableHeadPropsType> = ({
                                                            titles,
                                                            sortingField,
                                                            setSortingField
                                                        }) => {
    return (
        <MaterialTableHead>
            <TableRow className={style.row}>
                {titles.map((t, index) => {
                    return sortingField.key === t ?
                        <TableCell key={index}
                                   onClick={() => setSortingField(t as keyof UserType)}>{t} {sortingField.direction === 'up' ? <>▼</> : <>▲</>}</TableCell>
                        :
                        <TableCell key={index}
                                   onClick={() => setSortingField(t as keyof UserType)}>{t}</TableCell>
                })}
            </TableRow>
        </MaterialTableHead>

    )
}
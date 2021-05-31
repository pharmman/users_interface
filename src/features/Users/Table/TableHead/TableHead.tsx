import {TableCell, TableHead as MaterialTableHead, TableRow} from '@material-ui/core'
import style from '../Table.module.css'
import {UserType} from '../../users-reducer'
import React from 'react'
import {TitlesType} from '../TableContainer'
import {SortConfigType} from '../../../useSorting'

type TableHeadPropsType = {
    setSortingField: (key: keyof UserType) => void
    sortingField: SortConfigType
    titles: TitlesType[]
}

export const TableHead: React.FC<TableHeadPropsType> = React.memo(({
                                                                       titles,
                                                                       sortingField,
                                                                       setSortingField
                                                                   }) => {
    return (
        <MaterialTableHead>
            <TableRow className={style.row}>
                {titles.map((t, index) => {
                    return <TableCell width={t === 'id' ? '10%' : '20%'} align={'center'} key={index}
                                      onClick={() => setSortingField(t as keyof UserType)}>{t}
                        {sortingField.key === t ? sortingField.direction === 'up' ? <> ▼</> : <> ▲</> : <></>}</TableCell>
                })}
            </TableRow>
        </MaterialTableHead>
    )
})

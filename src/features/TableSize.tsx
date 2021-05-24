import React, {Dispatch, SetStateAction, useState} from 'react'
import {Redirect} from 'react-router-dom'
import {Users} from './Users/Users'

type TableSizePropsType = {
    setTableSize: Dispatch<SetStateAction<'small' | 'big' | null>>
}

export const TableSize:React.FC<TableSizePropsType> = () => {

    const [tableSize, setTableSize] = useState<'small' | 'big' | null>(null)

    const setSmallSize = () => {
        setTableSize('small')
    }
    const setBigSize = () => {
        setTableSize('big')
    }

    return (
        <div>
            <button onClick={setSmallSize}>Small</button>
            <button onClick={setBigSize}>Big</button>
            {tableSize &&<Users tableSize={tableSize}/>}
        </div>
    )
}
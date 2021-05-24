import React, {useState} from 'react'
import {Users} from '../../features/Users/Users'

export const Main:React.FC = () => {
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
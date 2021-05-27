import {Button} from '@material-ui/core'
import React, {Dispatch, SetStateAction} from 'react'

export const ButtonsSize:React.FC<{setTableSize:Dispatch<SetStateAction<"big" | "small" | null>>}> = ({setTableSize}) => {

    const setSmallSize = () => {
        setTableSize('small')
    }
    const setBigSize = () => {
        setTableSize('big')
    }

    return (
        <>
            <Button size={'large'} variant="contained" color="primary" onClick={setSmallSize}>Small</Button>
            <Button size={'large'} variant="contained" color="primary" onClick={setBigSize}>Big</Button>
        </>
    )
}
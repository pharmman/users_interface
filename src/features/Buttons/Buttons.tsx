import {Button, ButtonGroup} from '@material-ui/core'
import React from 'react'

type ButtonsPropsType = {
    setTableSizeHandler: (size: 'small' | 'big') => void
}

export const Buttons: React.FC<ButtonsPropsType> = ({setTableSizeHandler}) => {
    const setSmallSize = () => setTableSizeHandler('small')
    const setBigSize = () => setTableSizeHandler('big')

    return (
        <ButtonGroup>
            <Button size={'large'} variant="contained" color="primary" onClick={setSmallSize}>Small</Button>
            <Button size={'large'} variant="contained" color="primary" onClick={setBigSize}>Big</Button>
        </ButtonGroup>
    )
}
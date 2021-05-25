import React, {useState} from 'react'
import {Users} from '../../features/Users/Users'
import {Button, Container, Grid} from '@material-ui/core'
import styles from './Main.module.css'

export const Main: React.FC = () => {
    const [tableSize, setTableSize] = useState<'small' | 'big' | null>(null)
    const setSmallSize = () => {
        setTableSize('small')
    }
    const setBigSize = () => {
        setTableSize('big')
    }

    return (
        <Container fixed>
            <Grid container direction={'row'} justify={'center'} alignItems={'center'} className={!tableSize ? styles.wrapper : styles.buttons}>
                     <Grid container item justify={'center'} >
                    <Button size={'large'} variant="contained" color="primary" onClick={setSmallSize}>Small</Button>
                    <Button size={'large'} variant="contained" color="primary" onClick={setBigSize}>Big</Button>
                </Grid>
            </Grid>
                    {tableSize && <Users tableSize={tableSize}/>}
        </Container>
    )
}
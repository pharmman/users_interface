import React, {useState} from 'react'
import {Users} from '../../features/Users/Users'
import {Button, Container, Grid} from '@material-ui/core'
import styles from './Main.module.css'
import {ButtonsSize} from '../../features/Application/ButtonsSize'

export const Main: React.FC = () => {
    const [tableSize, setTableSize] = useState<'small' | 'big' | null>(null)

    return (
        <Container fixed>
            <Grid container direction={'row'} justify={'center'} alignItems={'center'} className={!tableSize ? styles.wrapper : styles.buttons}>
                     <Grid container item justify={'center'} >
                         <ButtonsSize setTableSize={setTableSize}/>
                </Grid>
            </Grid>
                    {tableSize && <Users tableSize={tableSize}/>}
        </Container>
    )
}
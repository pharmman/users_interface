import React, {useEffect, useState} from 'react'
import {Users} from '../../features/Users/Users'
import {Grid} from '@material-ui/core'
import styles from './Main.module.css'
import {Buttons} from '../../features/Buttons/Buttons'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../store'
import {Preloader} from '../../features/Preloader/Preloader'
import {getUsers} from '../../features/Users/users-reducer'
import {Error} from '../../features/Error/Error'
import {AppErrorType} from '../../features/Application/application-reducer'

export const Main: React.FC = () => {
    const dispatch = useDispatch()
    const [tableSize, setTableSize] = useState<'small' | 'big' | null>(null)
    const setTableSizeHandler = (size:'small' | 'big') => setTableSize(size)
    const appLoading = useSelector<AppRootStateType, boolean>(state => state.application.loading)
    const appError = useSelector<AppRootStateType, AppErrorType>(state => state.application.error)

    useEffect(() => {
        if (tableSize) {
            dispatch(getUsers(tableSize))
        }
    }, [tableSize, dispatch])

    if (appLoading) {
        return <Preloader/>
    }

    return (
        <>
            <Grid container direction={'row'} justify={'center'} alignItems={'center'}
                  className={styles.wrapper}>
                {!tableSize && <Grid container item justify={'center'}>
                    <Buttons setTableSizeHandler={setTableSizeHandler}/>
                </Grid>}
            </Grid>
            {tableSize && <Users/>}
            {appError &&<Error/>}
        </>
    )
}
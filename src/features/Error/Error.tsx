import React from 'react'
import {Snackbar} from '@material-ui/core'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../app/store'
import {AppErrorType, setAppError} from '../Application/application-reducer'

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export const Error = () => {
    const dispatch = useDispatch()
    const appError = useSelector<AppRootStateType, AppErrorType>(state => state.application.error)

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppError({error:null}))
    }

    return (
        <Snackbar open={appError !== null} autoHideDuration={10000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {appError}
            </Alert>
        </Snackbar>
    )
}
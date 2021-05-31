import {Box, CircularProgress, Grid} from '@material-ui/core'
import React from 'react'

export const Preloader = () => {
    return (
        <Box display={'flex'} height={'100vh'}>
            <Grid container direction={'row'} justify={'center'} alignItems={'center'}>
                <CircularProgress size={100}/>
            </Grid>
        </Box>
    )
}
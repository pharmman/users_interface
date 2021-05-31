import React from 'react'
import {Button, Grid, TextField} from '@material-ui/core'

type FindIndexPropsType = {
    inputValue: string
    setInputValueHandler: (value: string) => void
    setDataIsFilteredHandler: (condition: boolean) => void
}

export const Filtering: React.FC<FindIndexPropsType> = React.memo(({
                                                                       setInputValueHandler,
                                                                       inputValue,
                                                                       setDataIsFilteredHandler
                                                                   }) => {
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setInputValueHandler(e.currentTarget.value)
    const onClickHandler = () => setDataIsFilteredHandler(true)
    return (
        <Grid container justify={'center'}>
            <TextField type={'search'} variant="outlined" value={inputValue}
                       onChange={onChangeHandler}/>
            <Button color={'primary'} variant={'contained'} onClick={onClickHandler}>Find</Button>
        </Grid>
    )
})
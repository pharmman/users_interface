import React, {Dispatch, SetStateAction} from "react";
import {Button, TextField} from '@material-ui/core'

type FindIndexPropsType = {
    inputValue: string
    setInputValue: Dispatch<SetStateAction<string>>
    setIsDataFiltered: Dispatch<SetStateAction<boolean>>
}

export const Filtering: React.FC<FindIndexPropsType> = ({setInputValue, inputValue, setIsDataFiltered}) => {
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        setIsDataFiltered(false)
    }

    const onClickHandler = () => {
        setIsDataFiltered(true)
    }

    return (
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <TextField size={'small'} variant={'outlined'} value={inputValue} label={'Find'} onChange={onChangeHandler}/>
            <Button size={'large'} color={'primary'} variant={'contained'} onClick={onClickHandler}>Find</Button>
        </div>
    )
}
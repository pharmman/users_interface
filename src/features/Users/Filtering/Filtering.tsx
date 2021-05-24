import React, {Dispatch, SetStateAction} from "react";

type FindIndexPropsType = {
    inputValue: string
    setInputValue: Dispatch<SetStateAction<string>>
    setIsDataFiltered: Dispatch<SetStateAction<boolean>>
}

export const Filtering: React.FC<FindIndexPropsType> = ({setInputValue, inputValue, setIsDataFiltered}) => {
    const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        setIsDataFiltered(false)
    }

    const onClickHandler = () => {
        setIsDataFiltered(true)
    }

    return (
        <div>
            <input value={inputValue} onChange={onChangeHandler}/>
            <button onClick={onClickHandler}>Find</button>
        </div>
    )
}
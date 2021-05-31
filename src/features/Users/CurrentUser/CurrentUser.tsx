import React from "react";
import {UserType} from '../users-reducer'

type CurrentUserPropsType = {
    user: UserType
}

export const CurrentUser:React.FC<CurrentUserPropsType> = React.memo ( ({user}) => {
    return <div>
        Выбран пользователь <b>{user.firstName}</b><br/>
        Описание:
        <textarea defaultValue={user.description}/><br/>
        Адрес проживания: <b>{user.address.streetAddress}</b><br/>
        Город: <b>{user.address.city}</b><br/>
        Провинция/штат: <b>{user.address.state}</b><br/>
        Индекс: <b>{user.address.zip}</b><br/>
    </div>
})
import axios from 'axios'
import {UserType} from '../features/Users/Table/Table'

export const usersAPI = {
    getUsers(size: '32' | '1000') {
        return axios.get<UserType[]>(`http://www.filltext.com/?rows=${size}&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
    }
}
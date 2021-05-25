import {createAction, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {usersAPI} from '../../api/UsersApi'
import {setAppLoading} from '../Application/application-reducer'

export interface UserType {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
    address: AddressType
    description: string
}

export type AddressType = {
    streetAddress: string
    city: string
    state: string
    zip: string
}

type UserDomainType = Omit<UserType, 'address' | 'description'>

export const noAddress:AddressType = {
    zip: 'No indicated',
    state: 'No indicated',
    city: 'No indicated',
    streetAddress: 'No indicated',
}

export const getUsers = createAsyncThunk('users/getUsers', async (size: 'big' | 'small', {dispatch, rejectWithValue}) => {
    dispatch(setAppLoading({loading: true}))
    try {
        const res = await usersAPI.getUsers(size === 'small' ? '32' : '1000')
        return {users: res.data}
    } catch (err) {
        return rejectWithValue(err)
    }finally {
        dispatch(setAppLoading({loading: false}))
    }
})

const slice = createSlice({
    name: 'users',
    initialState: [] as UserType[],
    reducers: {
        addUser: (state, action:PayloadAction<{user:UserDomainType}>) => {
            state.unshift({...action.payload.user, description: 'No description', address: noAddress})
        }
    },
    extraReducers: builder => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            return [...action.payload.users]
        })
    }
})

export const usersReducer = slice.reducer
export const {addUser} = slice.actions

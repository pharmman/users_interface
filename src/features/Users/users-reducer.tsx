import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {usersAPI} from '../../api/UsersApi'
import {setAppError, setAppLoading} from '../Application/application-reducer'

export interface UserType {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
    address: AddressType
    description: string
}

// export type UserDomainType = Omit<UserType, 'description' & 'address'>

export type AddressType = {
    streetAddress: string
    city: string
    state: string
    zip: string
}

export type UserDomainType = Omit<UserType, 'address' | 'description'>

export const noAddress:AddressType = {
    zip: 'No indicated',
    state: 'No indicated',
    city: 'No indicated',
    streetAddress: 'No indicated',
}

export const getUsers = createAsyncThunk('users/getUsers', async (size: 'big' | 'small', {dispatch, rejectWithValue}) => {
    dispatch(setAppLoading({loading: true}))
    dispatch(setAppError({error: ''}))
    try {
        const res = await usersAPI.getUsers(size === 'small' ? '32' : '1000')
        return {users: res.data}
    } catch (err) {
        dispatch(setAppError({error: err.message}))
        console.log(err.message)
        return rejectWithValue(err)
    }finally {
        dispatch(setAppLoading({loading: false}))
    }
})

export const addUser = createAction<{user:UserDomainType }>('users/addUser')

const slice = createSlice({
    name: 'users',
    initialState: [] as UserType[],
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            return [...action.payload.users]
        })
        builder.addCase(addUser,((state, action) => {
            state.unshift({...action.payload.user, description: 'No description', address: noAddress})
        }))
    }
})

export const usersReducer = slice.reducer

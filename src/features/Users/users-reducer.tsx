import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {UserType} from './Table/Table'
import {usersAPI} from '../../api/UsersApi'
import {setAppLoading} from '../Application/application-reducer'

export const getUsers = createAsyncThunk('users/getUsers', async (size: 'big' | 'small', {dispatch, rejectWithValue}) => {
    dispatch(setAppLoading({loading: true}))
    try {
        debugger
        const res = await usersAPI.getUsers(size === 'small' ? '32' : '1000')
        return {users: res.data}
    } catch (err) {
        return rejectWithValue(err)
    }finally {
        debugger
        setAppLoading({loading: false})
    }
})

const slice = createSlice({
    name: 'users',
    initialState: [] as UserType[],
    reducers: {
        addUser: (state, action:PayloadAction<{user:UserType}>) => {
            state.unshift(action.payload.user)
        }
    },
    extraReducers: builder => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            return action.payload.users.map(u => ({...u}))
        })
    }
})

export const usersReducer = slice.reducer
export const {addUser} = slice.actions
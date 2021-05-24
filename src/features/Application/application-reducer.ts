import {createAction, createSlice} from '@reduxjs/toolkit'

export type AppErrorType = null | string

const initialState = {
    loading: false,
    error: null as AppErrorType,
}

export type appReducerInitialState = typeof initialState

export const setAppLoading = createAction<{ loading: boolean }>('app/setAppLoading')
export const setAppError = createAction<{ error: AppErrorType }>('app/setAppError')

export const slice = createSlice({
    name: 'app',
    initialState: initialState as appReducerInitialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(setAppLoading, (state, action) => {
            state.loading = action.payload.loading
        })
        builder.addCase(setAppError, (state, action) => {
            state.error = action.payload.error
        })
    }
})

export const applicationReducer = slice.reducer
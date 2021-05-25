import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit'

export type AppErrorType = string

const initialState = {
    loading: false,
    error: '' as AppErrorType,
}

export type AppReducerType = typeof initialState

export const setAppLoading = createAction<{ loading: boolean }>('app/setAppLoading')
export const setAppError = createAction<{ error: AppErrorType }>('app/setAppError')

export const slice = createSlice({
    name: 'app',
    initialState: initialState as AppReducerType,
    reducers: {
        setAppLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
            state.loading = action.payload.loading
        },
        setAppError: (state, action: PayloadAction<{ error: AppErrorType }>) => {
            state.error = action.payload.error
        }
    }
})

export const applicationReducer = slice.reducer
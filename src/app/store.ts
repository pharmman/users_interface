import {combineReducers} from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import {usersReducer} from '../features/Users/users-reducer'
import {applicationReducer} from '../features/Application/application-reducer'

export const rootReducer = combineReducers({
    users: usersReducer,
    application: applicationReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export type AppRootStateType = ReturnType<typeof store.getState>

// @ts-ignore
window.store = store